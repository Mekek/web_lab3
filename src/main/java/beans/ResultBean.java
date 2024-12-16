package beans;

import database.ResultInterface;
import lombok.Data;
import lombok.Getter;

import javax.inject.Named;
import javax.enterprise.context.SessionScoped;
import javax.inject.Inject;
import javax.annotation.PostConstruct;
import java.io.Serializable;
import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

/**
 * This class represents a bean for managing and interacting with results.
 */
@Data
@Named("results")  // Привязываем бин к имени "results"
@SessionScoped      // Область сессии
public class ResultBean implements Serializable {

    @Inject
    private ResultInterface resultInterface;

    private Result currResult;
    private List<Result> resultList;
    @Getter
    private String source;

    /**
     * Initializes the ResultBean by creating a new instance of Result and updating the local result list.
     */
    @PostConstruct
    private void initialize() {
        currResult = new Result();
        currResult.setX(BigDecimal.valueOf(0));
        updateLocal();
    }

    /**
     * Updates the local result list by fetching results from the ResultInterface.
     */
    private void updateLocal() {
        resultList = resultInterface.getAll();
    }

    /**
     * Adds the current result to the result list, including a timestamp of the request time.
     */
    public void addResult() {
        Result copyResult = new Result(currResult);
        SimpleDateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss");
        String requestTime = dateFormat.format(new Date(System.currentTimeMillis()));
        copyResult.setRequestTime(requestTime);
        resultInterface.save(copyResult);
        updateLocal();
    }

    /**
     * Clears all results in the resultInterface and updates the local result list.
     */
    public void clearResults() {
        resultInterface.clear();
        resultList = resultInterface.getAll();
        updateLocal();
    }

    /**
     * Sets the source attribute.
     *
     * @param source The source to be set.
     */
    public void setSource(String source) {
        this.source = source;
    }

    public void addPoint(BigDecimal xCenter, BigDecimal yCenter, BigDecimal r) {
        // Устанавливаем значения для текущего результата
        currResult.setX(xCenter);
        currResult.setY(yCenter);
        currResult.setR(r);

        // Проверяем попадание точки в область
        currResult.setHit(currResult.checkHit());

        // Добавляем результат в базу данных
        addResult(); // Этот метод сохранит результат в базу данных, включая время запроса
    }


}
