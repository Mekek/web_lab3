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
 * Валидатор для X (inputText: число от -5 до 5, максимум 12 символов)
 */
@FacesValidator("validatorX")
public class ValidatorX implements Validator {
    // Новое регулярное выражение: запрещает буквы, спецсимволы, два минуса/плюса
    private static final String NUMBER_PATTERN = "^[-+]?[0-9]*[.,]?[0-9]+$";

    @Override
    public void validate(FacesContext facesContext, UIComponent uiComponent, Object value) throws ValidatorException {
        if (value == null) {
            throw new ValidatorException(
                    new FacesMessage(FacesMessage.SEVERITY_ERROR, null,
                            "The X field cannot be empty!"));
        }

        String input = value.toString();

        // Проверка на максимальную длину (12 символов)
        if (input.length() > 12) {
            throw new ValidatorException(
                    new FacesMessage(FacesMessage.SEVERITY_ERROR, null,
                            "The value of X must be no more than 12 characters!"));
        }

        // Заменяем запятые на точки
        input = input.replace(",", ".");

        // Проверка на два минуса или два плюса
        if (input.contains("--") || input.contains("++") || input.contains("-+") || input.contains("+-")) {
            throw new ValidatorException(
                    new FacesMessage(FacesMessage.SEVERITY_ERROR, null,
                            "The value of X cannot contain multiple signs!"));
        }

        // Проверка формата числа
        if (!Pattern.matches(NUMBER_PATTERN, input)) {
            throw new ValidatorException(
                    new FacesMessage(FacesMessage.SEVERITY_ERROR, null,
                            "The value of X must be a valid number! Only digits, one decimal point, and one sign are allowed."));
        }

        BigDecimal x;
        try {
            x = new BigDecimal(input);
        } catch (NumberFormatException e) {
            throw new ValidatorException(
                    new FacesMessage(FacesMessage.SEVERITY_ERROR, null,
                            "The value of X must be a valid number!"));
        }

        BigDecimal minX = new BigDecimal("-5");
        BigDecimal maxX = new BigDecimal("5");

        if (x.compareTo(minX) < 0 || x.compareTo(maxX) > 0) {
            throw new ValidatorException(
                    new FacesMessage(FacesMessage.SEVERITY_ERROR, null,
                            "The value of X must be between -5 and 5!"));
        }
    }
}