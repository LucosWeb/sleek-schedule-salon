import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Trash2, Edit2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Service } from "./types/service";
import { useNavigate } from "react-router-dom";

export const ServicesTab = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [newService, setNewService] = useState({
    name: '',
    price: '',
    duration: '',
    description: ''
  });
  const [editingService, setEditingService] = useState<string | null>(null);

  // Check if user is authenticated and has admin role
  const { data: session } = useQuery({
    queryKey: ['session'],
    queryFn: async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) throw error;
      return session;
    }
  });

  // Fetch user profile to check role
  const { data: profile } = useQuery({
    queryKey: ['profile', session?.user?.id],
    enabled: !!session?.user?.id,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session?.user?.id)
        .single();

      if (error) throw error;
      return data;
    }
  });

  // Redirect if not admin
  if (session && profile && profile.role !== 'admin') {
    toast({
      title: "Unauthorized",
      description: "You need admin privileges to manage services",
      variant: "destructive"
    });
    navigate('/');
    return null;
  }

  const { data: services = [], isLoading } = useQuery({
    queryKey: ['services'],
    enabled: !!session && profile?.role === 'admin',
    queryFn: async () => {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) {
        toast({
          title: "Error loading services",
          description: error.message,
          variant: "destructive"
        });
        throw error;
      }

      return data || [];
    }
  });

  const addServiceMutation = useMutation({
    mutationFn: async (service: Omit<Service, 'id' | 'created_at'>) => {
      const { data, error } = await supabase
        .from('services')
        .insert([{
          name: service.name,
          price: parseFloat(service.price),
          duration: parseInt(service.duration),
          description: service.description,
          created_at: new Date().toISOString()
        }])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
      setNewService({
        name: '',
        price: '',
        duration: '',
        description: ''
      });
      toast({
        title: "Service added successfully!"
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error adding service",
        description: error.message,
        variant: "destructive"
      });
    }
  });

  const updateServiceMutation = useMutation({
    mutationFn: async (service: Service) => {
      const { error } = await supabase
        .from('services')
        .update({
          name: service.name,
          price: parseFloat(service.price),
          duration: parseInt(service.duration),
          description: service.description
        })
        .eq('id', service.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
      setEditingService(null);
      toast({
        title: "Service updated successfully!"
      });
    },
    onError: () => {
      toast({
        title: "Error updating service",
        variant: "destructive"
      });
    }
  });

  const removeServiceMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
      toast({
        title: "Service removed successfully!"
      });
    },
    onError: () => {
      toast({
        title: "Error removing service",
        variant: "destructive"
      });
    }
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (editingService) {
      const currentService = services.find(s => s.id === editingService);
      if (currentService) {
        updateServiceMutation.mutate({
          ...currentService,
          [name]: value
        });
      }
    } else {
      setNewService(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const addService = () => {
    if (!newService.name || !newService.price || !newService.duration) {
      toast({
        title: "Error adding service",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    addServiceMutation.mutate(newService);
  };

  if (!session) {
    navigate('/login');
    return null;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Add New Service</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Input
              placeholder="Service name"
              name="name"
              value={newService.name}
              onChange={handleInputChange}
            />
            <Input
              placeholder="Price ($)"
              name="price"
              value={newService.price}
              onChange={handleInputChange}
              type="number"
            />
            <Input
              placeholder="Duration (min)"
              name="duration"
              value={newService.duration}
              onChange={handleInputChange}
              type="number"
            />
            <Input
              placeholder="Description (optional)"
              name="description"
              value={newService.description}
              onChange={handleInputChange}
            />
          </div>
          <Button 
            onClick={addService}
            className="mt-4 w-full md:w-auto"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Service
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Services List</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Service</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {services.map((service) => (
                <TableRow key={service.id}>
                  <TableCell>
                    {editingService === service.id ? (
                      <Input
                        name="name"
                        value={service.name}
                        onChange={handleInputChange}
                      />
                    ) : (
                      service.name
                    )}
                  </TableCell>
                  <TableCell>
                    {editingService === service.id ? (
                      <Input
                        name="price"
                        value={service.price}
                        onChange={handleInputChange}
                        type="number"
                      />
                    ) : (
                      `$ ${service.price}`
                    )}
                  </TableCell>
                  <TableCell>
                    {editingService === service.id ? (
                      <Input
                        name="duration"
                        value={service.duration}
                        onChange={handleInputChange}
                        type="number"
                      />
                    ) : (
                      `${service.duration} min`
                    )}
                  </TableCell>
                  <TableCell>
                    {editingService === service.id ? (
                      <Input
                        name="description"
                        value={service.description}
                        onChange={handleInputChange}
                      />
                    ) : (
                      service.description
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      {editingService === service.id ? (
                        <>
                          <Button
                            variant="default"
                            size="icon"
                            onClick={() => setEditingService(null)}
                          >
                            ✓
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setEditingService(null)}
                          >
                            ✕
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setEditingService(service.id)}
                          >
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="icon"
                            onClick={() => removeServiceMutation.mutate(service.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
