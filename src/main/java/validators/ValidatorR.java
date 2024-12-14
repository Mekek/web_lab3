package validators;

import javax.faces.application.FacesMessage;
import javax.faces.component.UIComponent;
import javax.faces.context.FacesContext;
import javax.faces.validator.FacesValidator;
import javax.faces.validator.Validator;
import javax.faces.validator.ValidatorException;
import java.math.BigDecimal;

/**
 * This class defines a custom validator for the "R" input field in a JavaServer Faces (JSF) application.
 * It ensures that a value for R is selected from the available options (1, 2, 3, 4, 5).
 */
@FacesValidator("validatorR")
public class ValidatorR implements Validator {

    /**
     * Validates the "R" input field to ensure it's one of the predefined options (1, 2, 3, 4, 5).
     *
     * @param facesContext The current FacesContext.
     * @param uiComponent  The UIComponent associated with the "R" input field.
     * @param value        The value to be validated.
     * @throws ValidatorException if the validation fails, with an appropriate error message.
     */
    @Override
    public void validate(FacesContext facesContext, UIComponent uiComponent, Object value) throws ValidatorException {
        if (value == null) {
            throw new ValidatorException(
                    new FacesMessage(FacesMessage.SEVERITY_ERROR, null,
                            "Please select a value for R."));
        }

        // Преобразуем значение в BigDecimal (если это не null) и далее в int
        int rValue;
        if (value instanceof BigDecimal) {
            rValue = ((BigDecimal) value).intValue();  // Преобразуем BigDecimal в int
        } else {
            rValue = (Integer) value;  // Если значение уже Integer, то напрямую приводим
        }
        if (rValue < 1 || rValue > 5) {
            throw new ValidatorException(
                    new FacesMessage(FacesMessage.SEVERITY_ERROR, null,
                            "The value of R must be one of the following: 1, 2, 3, 4, 5."));
        }
    }
}
