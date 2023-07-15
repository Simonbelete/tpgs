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
  Stack,
  TextField,
  Typography,
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
import _ from "lodash";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const getItems = (count: number) =>
  Array.from({ length: count }, (v, k) => k).map((k) => ({
    id: `item-${k}`,
    content: `item ${k}`,
  }));

const StagesDnD = ({ createRef }: { createRef: React.Ref<unknown> }) => {
  const tableRef = useRef();
  const [stages, setStages] = useState<Stage[]>([{ id: -1, name: "Abc" }]);
  const [focusIndex, setFocusIndex] = useState<number>(-1);

  const onDragEnd = (result: any) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
  };

  useImperativeHandle(createRef, () => ({
    add() {
      const result = _.find(stages, function (o) {
        return o.id == null || o.id == -1;
      });
      if (result == undefined)
        setStages(_.union(stages, [{ id: -1, name: "" }]));
    },
  }));

  const handleSaveLine = (val: string, id: number) => {
    if (id == null || id == -1) {
      // Create New
      console.log("Create");
    } else {
      // Update By id
      console.log("Update");
    }
  };

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
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              {stages.map((item: Stage, index) => (
                <Draggable
                  key={item.id}
                  draggableId={String(item.id)}
                  index={index}
                  disableInteractiveElementBlocking={false}
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
                      <TableCell align="left">
                        {focusIndex == index ? (
                          <TextField
                            id="standard-basic"
                            label="Standard"
                            defaultValue={item.name}
                            variant="outlined"
                            size="small"
                          />
                        ) : (
                          <Typography>{item.name}</Typography>
                        )}
                      </TableCell>
                      <TableCell align="right"></TableCell>
                      <TableCell></TableCell>
                      <TableCell>
                        <Stack spacing={1} direction={"row"}>
                          <IconButton onClick={() => setFocusIndex(index)}>
                            <EditIcon fontSize="small" />
                          </IconButton>
                          <IconButton>
                            <DeleteOutlineIcon fontSize="small" />
                          </IconButton>
                        </Stack>
                      </TableCell>
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

  // return (
  //   <TableContainer component={Paper}>
  //     <DragDropContext onDragEnd={onDragEnd}>
  //       <Droppable droppableId="droppable">
  //         {(droppableProvided, droppableSnapshot) => (
  //           <Table ref={droppableProvided.innerRef} size="small">
  //             <TableHead>
  //               <TableRow>
  //                 <TableCell width={5}></TableCell>
  //                 <TableCell align="left">Name</TableCell>
  //                 <TableCell align="right">Minimum Week</TableCell>
  //                 <TableCell align="right">Maximum Week</TableCell>
  //               </TableRow>
  //             </TableHead>
  //             {stages.map((item: Stage, index) => (
  //               <Draggable
  //                 key={item.id}
  //                 draggableId={String(item.id)}
  //                 index={index}
  //                 disableInteractiveElementBlocking={true}
  //               >
  //                 {(draggableProvided, draggableSnapshot) => (
  //                   <TableRow
  //                     ref={draggableProvided.innerRef}
  //                     {...draggableProvided.draggableProps}
  //                     {...draggableProvided.dragHandleProps}
  //                   >
  //                     <TableCell align="left">
  //                       <Tooltip title="Move">
  //                         <IconButton>
  //                           <ControlCameraIcon />
  //                         </IconButton>
  //                       </Tooltip>
  //                     </TableCell>
  //                     <TableCell align="left">{item.name}</TableCell>
  //                     <TableCell align="right">
  //                       <InlineEditText
  //                         onSave={(val: string) => {
  //                           handleSaveLine(val, item.id);
  //                         }}
  //                       />
  //                     </TableCell>
  //                     <TableCell align="right">sdfsadfsf</TableCell>
  //                   </TableRow>
  //                 )}
  //               </Draggable>
  //             ))}
  //             {droppableProvided.placeholder}
  //           </Table>
  //         )}
  //       </Droppable>
  //     </DragDropContext>
  //   </TableContainer>
  // );
};

export default StagesDnD;
