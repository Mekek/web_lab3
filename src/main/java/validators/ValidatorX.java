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
 * Валидатор для X (inputText: число от -5 до 5, максимум 8 символов)
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

        // Проверка на максимальную длину
        if (input.length() > 8) {
            throw new ValidatorException(
                    new FacesMessage(FacesMessage.SEVERITY_ERROR, null,
                            "The value of X must be no more than 8 characters!"));
        }

        if (!Pattern.matches(NUMBER_PATTERN, input)) {
            throw new ValidatorException(
                    new FacesMessage(FacesMessage.SEVERITY_ERROR, null,
                            "The value of X must be a number!"));
        }

        BigDecimal x = new BigDecimal(input);
        BigDecimal minX = new BigDecimal("-5");
        BigDecimal maxX = new BigDecimal("5");

        if (x.compareTo(minX) < 0 || x.compareTo(maxX) > 0) {
            throw new ValidatorException(
                    new FacesMessage(FacesMessage.SEVERITY_ERROR, null,
                            "The value of X must be between -5 and 5!"));
        }
    }
}