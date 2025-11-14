package validators;

import javax.faces.application.FacesMessage;
import javax.faces.component.UIComponent;
import javax.faces.context.FacesContext;
import javax.faces.validator.FacesValidator;
import javax.faces.validator.Validator;
import javax.faces.validator.ValidatorException;

/**
 * Валидатор для Y (selectBooleanCheckbox: -5 ... 1)
 */
@FacesValidator("validatorY")
public class ValidatorY implements Validator {

    private static final int[] ALLOWED_VALUES = {-5, -4, -3, -2, -1, 0, 1};

    @Override
    public void validate(FacesContext facesContext, UIComponent uiComponent, Object value) throws ValidatorException {
        if (value == null) {
            throw new ValidatorException(
                    new FacesMessage(FacesMessage.SEVERITY_ERROR, null,
                            "Please select a value for Y."));
        }

        int yValue;
        if (value instanceof Integer) {
            yValue = (Integer) value;
        } else {
            throw new ValidatorException(
                    new FacesMessage(FacesMessage.SEVERITY_ERROR, null,
                            "Invalid value type for Y."));
        }

        boolean allowed = false;
        for (int v : ALLOWED_VALUES) {
            if (v == yValue) {
                allowed = true;
                break;
            }
        }

        if (!allowed) {
            throw new ValidatorException(
                    new FacesMessage(FacesMessage.SEVERITY_ERROR, null,
                            "The value of Y must be one of -5, -4, -3, -2, -1, 0, 1"));
        }
    }
}
