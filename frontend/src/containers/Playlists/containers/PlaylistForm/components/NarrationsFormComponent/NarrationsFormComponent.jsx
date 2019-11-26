import React from 'react';
import { connect } from 'react-redux';
import { DragDropContext as dragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { change } from 'redux-form';
import uuid from 'uuid';

import './NarrationsFormComponent.scss';

//components
import NarrationFormElement from '../NarrationFormElement/NarrationFormElement.jsx';

const NarrationFormElements = ({ formValues, fields, moveNarration }) => (
    fields.map((narration, index) =>
        <NarrationFormElement
            key={`narration_${uuid.v4()}_${formValues.narrations[index].id}`}
            index={index}
            narration={narration}
            moveNarration={moveNarration} remove={fields.remove}
            formValues={formValues}/>
    ));

class NarrationsFormComponent extends React.Component {
    moveNarration(dragIndex, hoverIndex) {
        const { formValues, moveNarration } = this.props;

        const newNarrationsArray = formValues.narrations.slice();
        newNarrationsArray.splice(dragIndex, 1);
        newNarrationsArray.splice(hoverIndex, 0, formValues.narrations[dragIndex]);
        moveNarration(newNarrationsArray);
    }

    render() {
        const { fields, formValues } = this.props;

        return (
            <div>
                <NarrationFormElements formValues={formValues} fields={fields} moveNarration={::this.moveNarration}/>
                <div className="button-container">
                    <button className="btn btn-pink small " type="button" onClick={() => fields.push({})}>
                        <span>+</span>Add another playlist narration
                    </button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        formValues: state.form.playlistForm && state.form.playlistForm.values ? state.form.playlistForm.values : {}
    };
};

const mapDispatchToProps = dispatch => {
    return {
        moveNarration: newNarrationsArray => {
            dispatch(change('playlistForm', 'narrations', newNarrationsArray));
        }
    };
};

NarrationsFormComponent = dragDropContext(HTML5Backend)(NarrationsFormComponent);

export default connect(mapStateToProps, mapDispatchToProps)(NarrationsFormComponent);