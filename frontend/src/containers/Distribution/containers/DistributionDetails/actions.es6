import * as distributionService from '../../../../services/distributionService.es6';
import * as additionalServicesActionsConstants from '../../../../constants/actions/distribution.es6';

export function getAdditionalServices() {
    return dispatch => {
        dispatch({type: additionalServicesActionsConstants.GET_ADDITIONAL_SERVICES});

        distributionService.getAdditionalServices().then(response => {
            dispatch({
                type: additionalServicesActionsConstants.GET_ADDITIONAL_SERVICES_SUCCESS,
                payload: response.data
            });
        }).catch(errorResponse => {
            console.log(errorResponse);
        });
    };
}