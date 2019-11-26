import React from 'react';
import {connect} from 'react-redux';
import { Field, change } from 'redux-form';
import classNames from 'classnames';
import _ from 'lodash';

import { wordsInPackage } from '../../../../constants/orderConstants.es6';

import playIcon from '../../../../assets/img/play-icon.svg';
import notepadIcon from '../../../../assets/img/notepad-icon.svg';

import './NarrationsForm.scss';

import { getPostData, getNarrators, playPauseNarrator } from './actions.es6';

//components
import ReduxFormSelect from '../../../../components/ReduxFormSelect/ReduxFormSelect.jsx';

class NarrationsForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            openedNoteIndex: -1
        };
    }

    componentDidMount() {
        this.props.onGetNarrators();
    }

    toggleNotes(index) {
        this.setState({
            openedNoteIndex: this.state.openedNoteIndex === index ? -1 : index
        });
    }

    onChangeNarrationsCount(narrationsCount) {
        const { formValues, onChangeNarrationsInPackage } = this.props;
        if (parseInt(formValues.narrations_count, 10) < narrationsCount) {
            onChangeNarrationsInPackage(narrationsCount);
        }
    }

    render() {
        const { formValues, onGetPostData, narrators, onPlayPauseNarrator, fields, prices } = this.props;

        const { openedNoteIndex } = this.state;

        console.log('Fields: ');
        console.log(fields);

        return (
            <div className="urls-to-narrate">
                <h3>Urls to Narrate</h3>
                <table>
                    <thead>
                        <tr>
                            <th className="post-url">Post Url</th>
                            <th className="narrator">Narrator</th>
                            <th className="listen">Listen</th>
                            <th className="notes">Notes</th>
                            <th className="words">Words</th>
                            <th className="price">Price</th>
                            <th className="remove" />
                        </tr>
                    </thead>
                    <tbody>
                        {fields.map((post, index) => {
                            let overPackagePrice = 0;
                            if (formValues.narrations[index].words - wordsInPackage > 0) {
                                overPackagePrice = (formValues.narrations[index].words - wordsInPackage) * prices.additionalPrice;
                            }

                            const notesClasses = classNames({
                                'textarea-row': true,
                                hidden: index !== openedNoteIndex
                            });

                            const selectedNarrator = formValues.narrations[index] ? formValues.narrations[index].narrator : null;

                            const isRequired = !_.isEmpty(formValues.narrations[index]) || index === 0;

                            return [
                                <tr key={index}>
                                    <td className="post-url">
                                        <Field
                                            component="input"
                                            type="url"
                                            className="input"
                                            name={`${post}.url`}
                                            onBlur={e => onGetPostData(e.target.value, index)}
                                            placeholder="Post url"
                                            required={isRequired}
                                        />
                                    </td>
                                    <td className="narrator">
                                        <Field
                                            component={ReduxFormSelect}
                                            name={`${post}.narrator`}
                                            options={narrators}
                                            getOptionLabel={option => option.first_name}
                                            getOptionValue={option => option.id}
                                            placeholder="Select narrator"
                                            required={isRequired}
                                        />
                                    </td>
                                    <td className="listen">
                                        <button onClick={selectedNarrator ? () => onPlayPauseNarrator(selectedNarrator) : () => {}} type="button">
                                            <img src={playIcon} alt="play icon"/>
                                        </button>
                                    </td>
                                    <td className="notes">
                                        <button onClick={() => ::this.toggleNotes(index)} type="button">
                                            <img src={notepadIcon} alt="notepad icon"/>
                                        </button>
                                    </td>
                                    <td className="words">
                                        {formValues.narrations[index] && formValues.narrations[index].words}
                                    </td>
                                    <td className="price">
                                        {(formValues.narrations[index] && formValues.narrations[index].words) && `$${(prices.packagePrice + overPackagePrice).toFixed(2)}`}
                                    </td>
                                    <td className="remove">
                                        {Boolean(formValues.narrations.length > 1) &&
                                        <button onClick={() => fields.remove(index)} type="button">
                                            ×
                                        </button>
                                        }
                                    </td>
                                </tr>,
                                <tr className={notesClasses} key={`${index}_textarea`}>
                                    <td colSpan={7}>
                                        <Field
                                            component="textarea"
                                            name={`narrations[${index}].notes`}
                                            placeholder="Notes..."
                                        />
                                    </td>
                                </tr>
                            ];
                        })}
                    </tbody>
                </table>
                <div className="button-container">
                    <button
                        className="btn btn-pink plus"
                        onClick={() => {
                            ::this.onChangeNarrationsCount(fields.length + 1);
                            fields.push({});
                        }}
                        type="button"
                    >
                        <span>+</span>
                        Add New
                    </button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        formValues: state.form ? (state.form.orderNarrationsForm && state.form.orderNarrationsForm.values) ? state.form.orderNarrationsForm.values : {} : {},
        narrators: state.orderNarrationReducer.narrators
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetNarrators: () => {
            dispatch(getNarrators());
        },
        onGetPostData: (value, index) => {
            dispatch(getPostData(value, index));
        },
        onPlayPauseNarrator: narrator => {
            dispatch(playPauseNarrator(narrator));
        },
        onChangeNarrationsInPackage(narrationsCount) {
            dispatch(change('orderNarrationsForm', 'narrations_count', narrationsCount));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NarrationsForm);