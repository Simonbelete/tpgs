import React, {
  useReducer,
  useRef,
  useState,
  useImperativeHandle,
} from "react";
import {
  Paper,
  TableRow,
  Table,
  TableCell,
  TableHead,
  TableContainer,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  DragDropContext,
  DropResult,
  Droppable,
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
  DroppableProvided,
} from "react-beautiful-dnd";
import ControlCameraIcon from "@mui/icons-material/ControlCamera";
import { InlineEditText } from "@/components/inputs";
import { Stage } from "@/models";

const getItems = (count: number) =>
  Array.from({ length: count }, (v, k) => k).map((k) => ({
    id: `item-${k}`,
    content: `item ${k}`,
  }));

const StagesDnD = ({ createRef }: { createRef: React.Ref<unknown> }) => {
  const tableRef = useRef();
  const [stages, setStages] = useState<Stage[]>([]);

  const onDragEnd = (result: any) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
  };

  useImperativeHandle(createRef, () => ({
    add() {
      console.log("child function");
    },
  }));

  return (
    <TableContainer component={Paper}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(droppableProvided, droppableSnapshot) => (
            <Table ref={droppableProvided.innerRef} size="small">
              <TableHead>
                <TableRow>
                  <TableCell width={5}></TableCell>
                  <TableCell align="left">Name</TableCell>
                  <TableCell align="right">Minimum Week</TableCell>
                  <TableCell align="right">Maximum Week</TableCell>
                </TableRow>
              </TableHead>
              {stages.map((item: Stage, index) => (
                <Draggable
                  key={item.id}
                  draggableId={String(item.id)}
                  index={index}
                  disableInteractiveElementBlocking={true}
                >
                  {(draggableProvided, draggableSnapshot) => (
                    <TableRow
                      ref={draggableProvided.innerRef}
                      {...draggableProvided.draggableProps}
                      {...draggableProvided.dragHandleProps}
                    >
                      <TableCell align="left">
                        <Tooltip title="Move">
                          <IconButton>
                            <ControlCameraIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                      <TableCell align="left">{item.name}</TableCell>
                      <TableCell align="right">
                        <InlineEditText />
                      </TableCell>
                      <TableCell align="right">sdfsadfsf</TableCell>
                    </TableRow>
                  )}
                </Draggable>
              ))}
              {droppableProvided.placeholder}
            </Table>
          )}
        </Droppable>
      </DragDropContext>
    </TableContainer>
  );
};

export default StagesDnD;
