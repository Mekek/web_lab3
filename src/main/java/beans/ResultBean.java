package beans;

import database.ResultInterface;
import lombok.Data;

import javax.annotation.PostConstruct;
import javax.enterprise.context.SessionScoped;
import javax.inject.Inject;
import javax.inject.Named;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.*;

@Data
@Named("results")
@SessionScoped
public class ResultBean implements Serializable {

    @Inject
    private ResultInterface resultInterface;

    private Result currResult;               // временный объект для X и R
    private List<Result> resultList;         // таблица
    private String source;

    private final List<Integer> yValues = Arrays.asList(-5, -4, -3, -2, -1, 0, 1);
    private Map<Integer, Boolean> ySelection;  // выбранные значения Y

    @PostConstruct
    private void initialize() {
        currResult = new Result();
        currResult.setX(BigDecimal.ZERO);
        currResult.setR(null);

        // ни одно значение Y не выбрано в начале
        ySelection = new HashMap<>();
        for (int y : yValues) ySelection.put(y, false);

        updateLocal();
    }

    private void updateLocal() {
        resultList = resultInterface.getAll();
    }

    /**
     * Возвращает список выбранных значений Y
     */
    public List<BigDecimal> getSelectedYValues() {
        List<BigDecimal> selected = new ArrayList<>();
        for (int y : yValues) {
            if (Boolean.TRUE.equals(ySelection.get(y))) {
                selected.add(BigDecimal.valueOf(y));
            }
        }
        return selected;
    }

    /**
     * Добавление нескольких точек (по всем Y)
     */
    public void addPoint(BigDecimal x, BigDecimal ignoredY, BigDecimal r) {

        List<BigDecimal> ys = getSelectedYValues();

        if (x == null || r == null || ys.isEmpty()) return;

        for (BigDecimal y : ys) {

            Result res = new Result();
            res.setX(x);
            res.setY(y);
            res.setR(r);
            res.setHit(res.checkHit());
            res.setRequestTime(LocalDateTime.now());

            resultInterface.save(res);
        }

        updateLocal();
    }

    /**
     * Очистка
     */
    public void clearResults() {
        resultInterface.clear();
        updateLocal();

        currResult = new Result();
        currResult.setX(BigDecimal.ZERO);
        currResult.setR(null);

        ySelection.replaceAll((k, v) -> false);
    }
}
