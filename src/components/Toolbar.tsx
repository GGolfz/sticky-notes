import React, { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { setShowTrashDialogFlag } from "../store/global";
import { addNote, updateNoteById, deleteAllNote } from "../store/note";
import "../less/toolbar.less";

const Toolbar = () => {
  const globalState = useAppSelector((state) => state.global);
  const dispatch = useAppDispatch();

  const handleStopPropagation = useCallback((event: React.MouseEvent) => {
    event.stopPropagation();
  }, []);

  const handleNewCardButtonClick = useCallback(() => {
    const now = Date.now();

    dispatch(
      addNote({
        id: `${now}`,
        content: "",
        bounding: {
          width: 256,
          height: 128,
        },
        position: {
          x: 100,
          y: 100,
        },
        status: "NORMAL",
        createdTs: now,
        updatedTs: now,
      })
    );
  }, []);

  const handleTrashMouseUp = useCallback(() => {
    if (globalState.draggingNote) {
      dispatch(
        updateNoteById({
          id: globalState.draggingNote.id,
          note: {
            status: "TRASH",
          },
        })
      );
    }
  }, [globalState.draggingNote]);

  const handleTrashClick = useCallback(() => {
    dispatch(setShowTrashDialogFlag(!globalState.showTrashDialogFlag));
  }, [globalState.showTrashDialogFlag]);

  const handleClearClick = useCallback(() => {
    dispatch(deleteAllNote());
  }, []);

  return (
    <div
      className={`toolbar-container opacity-80 ${
        globalState.draggingNote ? "z-10" : ""
      }`}
      onDoubleClick={handleStopPropagation}
    >
      <span className="action-btn" onClick={handleNewCardButtonClick}>
        📝
      </span>
      <span
        className="action-btn trash-bin"
        onClick={handleTrashClick}
        onMouseUp={handleTrashMouseUp}
      >
        🗑
      </span>
      <span className="action-btn" onClick={handleClearClick}>
        🆑
      </span>
    </div>
  );
};

export default Toolbar;
