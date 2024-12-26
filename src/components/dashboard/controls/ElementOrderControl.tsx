import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUp, ArrowDown } from "lucide-react";
import { ElementOrder } from "../types/customization";

interface ElementOrderControlProps {
  elementOrder: ElementOrder[];
  onDragEnd: (result: any) => void;
}

export const ElementOrderControl = ({ elementOrder, onDragEnd }: ElementOrderControlProps) => {
  return (
    <Card className="bg-gray-50">
      <CardHeader>
        <CardTitle className="text-lg">Ordem dos Elementos</CardTitle>
      </CardHeader>
      <CardContent>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="elements">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="space-y-2"
              >
                {elementOrder.map((element, index) => (
                  <Draggable
                    key={element.id}
                    draggableId={element.id}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="flex items-center justify-between p-3 bg-white rounded-lg border hover:border-barber-primary/50 transition-colors cursor-move"
                      >
                        <span>{element.label}</span>
                        <div className="flex items-center gap-2 text-gray-400">
                          <ArrowUp className="w-4 h-4" />
                          <ArrowDown className="w-4 h-4" />
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </CardContent>
    </Card>
  );
};