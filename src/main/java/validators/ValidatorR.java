package validators;

import javax.faces.application.FacesMessage;
import javax.faces.component.UIComponent;
import javax.faces.context.FacesContext;
import javax.faces.validator.FacesValidator;
import javax.faces.validator.Validator;
import javax.faces.validator.ValidatorException;

/**
 * Валидатор для R (selectOneRadio: 1-5)
 */
@FacesValidator("validatorR")
public class ValidatorR implements Validator {

    @Override
    public void validate(FacesContext facesContext, UIComponent uiComponent, Object value) throws ValidatorException {
        if (value == null) {
            throw new ValidatorException(
                    new FacesMessage(FacesMessage.SEVERITY_ERROR, null,
                            "Please select a value for R."));
        }

        int rValue;
        if (value instanceof Integer) {
            rValue = (Integer) value;
        } else {
            throw new ValidatorException(
                    new FacesMessage(FacesMessage.SEVERITY_ERROR, null,
                            "Invalid value type for R."));
        }

        if (rValue < 1 || rValue > 5) {
            throw new ValidatorException(
                    new FacesMessage(FacesMessage.SEVERITY_ERROR, null,
                            "The value of R must be one of the following: 1, 2, 3, 4, 5."));
        }
    }
}
