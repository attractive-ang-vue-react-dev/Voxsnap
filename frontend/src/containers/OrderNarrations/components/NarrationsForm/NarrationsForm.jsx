import React from 'react';
import {connect} from 'react-redux';
import { Field, change } from 'redux-form';
import classNames from 'classnames';
//import _ from 'lodash';

import { wordsInPackage } from '../../../../constants/orderConstants.es6';

import playIcon from '../../../../assets/img/play-icon.svg';
import pauseIcon from '../../../../assets/img/pause-icon.svg';
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

    // componentWillMount() {
    //     const { formValues, fields, prices } = this.props;
    //     const narrationsNeeded = prices.narrationsCount + parseInt(formValues.narrations_count, 10);
    //     if (fields.length < narrationsNeeded) {
    //         fields.push({}); //need to dynamically call this until fields.length = narrationsNeeded
    //     }
    // }

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
        const { formValues, onGetPostData, narrators, isPlaying, onPlayPauseNarrator, fields, prices } = this.props;
        const { openedNoteIndex } = this.state;

        return (
            <section className="NarrationsForm">
                <h4 className="NarrationsForm-title">URLs to Narrate</h4>
                <div className="NarrationsForm-list">
                    <section className="NarrationsForm-desktopHeading">
                        <div className="NarrationsForm-colMain">
                            <div className="NarrationsForm-num"></div>
                            <div className="NarrationsForm-url">Post Url</div>
                        </div>
                        <div className="NarrationsForm-colOptions">
                            <div className="NarrationsForm-narrator">Narrator</div>
                            <div className="NarrationsForm-listen">Listen</div>
                            <div className="NarrationsForm-notes">Notes</div>
                            <div className="NarrationsForm-words">Words</div>
                            <div className="NarrationsForm-payment">Additional Payment</div>
                        </div>
                    </section>

                    {fields.map((post, index) => {
                        let overPackagePrice = 0;
                        if (formValues.narrations[index].words - wordsInPackage > 0) {
                            overPackagePrice = (formValues.narrations[index].words - wordsInPackage) * prices.additionalPrice;
                        }

                        const notesClasses = classNames({
                            'NarrationsForm-notesField': true,
                            hidden: index !== openedNoteIndex
                        });

                        const selectedNarrator = formValues.narrations[index] ? formValues.narrations[index].narrator : null;

                        //const isRequired = !_.isEmpty(formValues.narrations[index]) || index === 0;

                        return [
                            <section className="NarrationsForm-item" key={index}>
                                <div className="NarrationsForm-itemInner">
                                    <div className="NarrationsForm-colMain">
                                        <div className="NarrationsForm-mobileHeading">
                                            <div className="NarrationsForm-mobileHeadingNum">{index + 1}</div>
                                            <div className="NarrationsForm-mobileHeadingUrl">Post Url</div>
                                            <div className="NarrationsForm-mobileHeadingPackage">Package</div>
                                        </div>
                                        <div className="NarrationsForm-num">{index + 1}</div>
                                        <div className="NarrationsForm-url">
                                            <Field
                                                component="input"
                                                type="url"
                                                className="NarrationsForm-input"
                                                name={`${post}.url`}
                                                onBlur={e => onGetPostData(e.target.value, index)}
                                                placeholder="Post url"
                                                //required={isRequired}
                                            />
                                        </div>
                                    </div>
                                    <div className="NarrationsForm-colOptions">
                                        <div className="NarrationsForm-narrator">
                                            <div className="NarrationsForm-mobileLabel">Narrator</div>
                                            <Field
                                                component={ReduxFormSelect}
                                                name={`${post}.narrator`}
                                                options={narrators}
                                                getOptionLabel={option => option.first_name}
                                                getOptionValue={option => option.id}
                                                placeholder="Select narrator"
                                                //required={isRequired}
                                            />
                                        </div>
                                        <div className="NarrationsForm-listen">
                                            <div className="NarrationsForm-mobileLabel">Listen</div>
                                            <button className="NarrationsForm-btn" onClick={selectedNarrator ? () => onPlayPauseNarrator(selectedNarrator) : () => {}} type="button">
                                                {!isPlaying && <img src={playIcon} alt="play icon" key={index} />}
                                                {isPlaying && <img src={pauseIcon} alt="pause icon" key={index} />}
                                            </button>
                                        </div>
                                        <div className="NarrationsForm-notes">
                                            <div className="NarrationsForm-mobileLabel">Notes</div>
                                            <button className="NarrationsForm-btn" onClick={() => ::this.toggleNotes(index)} type="button">
                                                <img src={notepadIcon} alt="notepad icon"/>
                                            </button>
                                        </div>
                                        <div className="NarrationsForm-words">
                                            <div className="NarrationsForm-mobileLabel">Extra Words</div>
                                            <div className="NarrationsForm-wordsAmmount">{formValues.narrations[index] && formValues.narrations[index].words}</div>
                                        </div>
                                        <div className="NarrationsForm-payment">
                                            <div className="NarrationsForm-mobileLabel">Payment</div>
                                            <div className="NarrationsForm-paymentType">{(formValues.narrations[index] && formValues.narrations[index].words) && `$${(overPackagePrice).toFixed(2)}`}</div>
                                        </div>
                                        <div className="NarrationsForm-remove">
                                            {Boolean(formValues.narrations.length > 1) &&
                                            <button onClick={() => fields.remove(index)} type="button">
                                                ×
                                            </button>
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className={notesClasses} key={`${index}_textarea`}>
                                    <Field
                                        component="textarea"
                                        name={`narrations[${index}].notes`}
                                        placeholder="Notes..."
                                    />
                                </div>
                            </section>
                        ];
                    })}

                </div>
                <div className="NarrationsForm-button-container">
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
            </section>
        );
    }
}

const mapStateToProps = state => {
    return {
        formValues: state.form ? (state.form.orderNarrationsForm && state.form.orderNarrationsForm.values) ? state.form.orderNarrationsForm.values : {} : {},
        narrators: state.orderNarrationReducer.narrators,
        isPlaying: state.orderNarrationReducer.isPlayingNarrator
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
