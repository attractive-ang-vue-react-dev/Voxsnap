import React from 'react';
import { findDOMNode } from 'react-dom';
import { DragSource as dragSource, DropTarget as dropTarget } from 'react-dnd';
import { Field } from 'redux-form';
import Dropdown, {DropdownTrigger, DropdownContent} from 'react-simple-dropdown';

//components
import ReduxFormSelect from '../../../../../../components/ReduxFormSelect/ReduxFormSelect.jsx';

import './NarrationFormElement.scss';
import {searchNarrations} from '../../../../../../services/narrationsService.es6';
import {getAsyncOptions} from '../../../../../../utils/helperFunctions.es6';

const cardSource = {
    beginDrag(props) {
        return {
            id: props.id,
            index: props.index
        };
    }
};

const cardTarget = {
    hover(props, monitor, component) {
        const dragIndex = monitor.getItem().index;
        const hoverIndex = props.index;

        // Don't replace items with themselves
        if (dragIndex === hoverIndex) {
            return;
        }

        // Determine rectangle on screen
        const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

        // Get vertical middle
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

        // Determine mouse position
        const clientOffset = monitor.getClientOffset();

        // Get pixels to the top
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;

        // Only perform the move when the mouse has crossed half of the items height
        // When dragging downwards, only move when the cursor is below 50%
        // When dragging upwards, only move when the cursor is above 50%

        // Dragging downwards
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
            return;
        }

        // Dragging upwards
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
            return;
        }

        // Time to actually perform the action
        props.moveNarration(dragIndex, hoverIndex);

        // Note: we're mutating the monitor item here!
        // Generally it's better to avoid mutations,
        // but it's good here for the sake of performance
        // to avoid expensive index searches.
        monitor.getItem().index = hoverIndex;
    }
};

const connectDropTargetFunc = connect => ({
    connectDropTarget: connect.dropTarget()
});

const connectDragSourceFunc = (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
    connectDragPreview: connect.dragPreview()
});

class NarrationFormElement extends React.Component {
    render() {
        const {narration, isDragging, connectDragSource, connectDropTarget, connectDragPreview, index, remove } = this.props;
        const opacity = isDragging ? 0 : 1;

        return connectDragPreview(
            connectDropTarget(
                <div style={{ opacity }} className="narration-dragging-element">
                    <div className="bars">
                        {connectDragSource(<i className="fa fa-bars"/>)}
                    </div>
                    <div className="index">{index + 1}</div>
                    <Field
                        name={`${narration}`}
                        component={ReduxFormSelect}
                        className="Select"
                        classNamePrefix="Select"
                        loadOptions={inputValue => getAsyncOptions(inputValue, searchNarrations)}
                        getOptionLabel={option => option.url}
                        getOptionValue={option => option.id}
                    />
                    <Dropdown className="ellipsis">
                        <DropdownTrigger className="ellipsis-trigger">
                            <i className="fa fa-ellipsis-v"/>
                        </DropdownTrigger>
                        <DropdownContent className="delete-button-content">
                            <button className="delete-button" type="button" onClick={() => remove(index)}>
                                <i className="fa fa-times"/>
                                <span>Delete</span>
                            </button>
                        </DropdownContent>
                    </Dropdown>
                </div>
            )
        );
    }
}

NarrationFormElement = dropTarget('narration', cardTarget, connectDropTargetFunc)(NarrationFormElement);
NarrationFormElement = dragSource('narration', cardSource, connectDragSourceFunc)(NarrationFormElement);

export default NarrationFormElement;