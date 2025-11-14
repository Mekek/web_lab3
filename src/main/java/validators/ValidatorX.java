package validators;

import javax.faces.application.FacesMessage;
import javax.faces.component.UIComponent;
import javax.faces.context.FacesContext;
import javax.faces.validator.FacesValidator;
import javax.faces.validator.Validator;
import javax.faces.validator.ValidatorException;
import java.math.BigDecimal;
import java.util.regex.Pattern;

/**
 * Валидатор для X (inputText: -4.9 ... 4.9, шаг 0.1)
 */
@FacesValidator("validatorX")
public class ValidatorX implements Validator {
    private static final String NUMBER_PATTERN = "^(-)?[0-9]+(\\.[0-9]+)?$";

    @Override
    public void validate(FacesContext facesContext, UIComponent uiComponent, Object value) throws ValidatorException {
        if (value == null) {
            throw new ValidatorException(
                    new FacesMessage(FacesMessage.SEVERITY_ERROR, null,
                            "The X field cannot be empty!"));
        }

        String input = value.toString().replace(",", ".");

        if (!Pattern.matches(NUMBER_PATTERN, input)) {
            throw new ValidatorException(
                    new FacesMessage(FacesMessage.SEVERITY_ERROR, null,
                            "The value of X must be a number!"));
        }

        BigDecimal x = new BigDecimal(input);
        BigDecimal minX = new BigDecimal("-4.9");
        BigDecimal maxX = new BigDecimal("4.9");
        BigDecimal step = new BigDecimal("0.1");

        boolean valid = false;
        BigDecimal current = minX;
        while (current.compareTo(maxX) <= 0) {
            if (current.compareTo(x) == 0) {
                valid = true;
                break;
            }
            current = current.add(step);
        }

        if (!valid) {
            throw new ValidatorException(
                    new FacesMessage(FacesMessage.SEVERITY_ERROR, null,
                            "The value of X must be from -4.9 to 4.9 with step 0.1"));
        }
    }
}
