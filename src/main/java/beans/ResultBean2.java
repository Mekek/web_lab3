package beans;

import database.ResultInterface;

import javax.annotation.PostConstruct;
import javax.enterprise.context.SessionScoped;
import javax.faces.context.FacesContext;
import javax.faces.application.FacesMessage;
import javax.inject.Inject;
import javax.inject.Named;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Named("results")
@SessionScoped
public class ResultBean2 implements Serializable {

    @Inject
    private ResultInterface resultInterface;

    private Result currResult;
    private List<Result> resultList;
    private String source = "form";

    private boolean y5;
    private boolean y4;
    private boolean y3;
    private boolean y2;
    private boolean y1;
    private boolean y0;
    private boolean y_1;

    public ResultBean2() {}

    @PostConstruct
    private void initialize() {
        currResult = new Result();
        currResult.setX(BigDecimal.ZERO);
        currResult.setR(null);
        updateLocal();
    }

    private void updateLocal() {
        resultList = resultInterface.getAll();
    }

    public List<BigDecimal> getSelectedYValues() {
        List<BigDecimal> selected = new ArrayList<>();
        if (y5) selected.add(BigDecimal.valueOf(-5));
        if (y4) selected.add(BigDecimal.valueOf(-4));
        if (y3) selected.add(BigDecimal.valueOf(-3));
        if (y2) selected.add(BigDecimal.valueOf(-2));
        if (y1) selected.add(BigDecimal.valueOf(-1));
        if (y0) selected.add(BigDecimal.valueOf(0));
        if (y_1) selected.add(BigDecimal.valueOf(1));
        return selected;
    }


    public void addPointFromForm() {
        FacesContext context = FacesContext.getCurrentInstance();
        Map<String, String> params = context.getExternalContext().getRequestParameterMap();

        String source = this.source;
        BigDecimal x = currResult.getX();
        BigDecimal r = currResult.getR();

        if (x == null || r == null) {
            return;
        }

        if ("graph".equals(source)) {
            String yParam = params.get("yHiddenInput");
            if (yParam != null && !yParam.trim().isEmpty()) {
                try {
                    BigDecimal y = new BigDecimal(yParam);
                    y = y.setScale(3, BigDecimal.ROUND_HALF_UP);

                    Result res = new Result();
                    res.setX(x);
                    res.setY(y);
                    res.setR(r);
                    res.setHit(res.checkHit());
                    res.setRequestTime(LocalDateTime.now());
                    resultInterface.save(res);

                    this.source = "form";
                } catch (NumberFormatException e) {
                    System.err.println("Invalid Y value from graph: " + yParam);
                    this.source = "form";
                }
            }
        } else {
            List<BigDecimal> ys = getSelectedYValues();
            if (ys.isEmpty()) {
                context.addMessage("messagesC", new FacesMessage(FacesMessage.SEVERITY_ERROR, "Error", "Please select at least one Y value!"));
                return;
            }

            for (BigDecimal y : ys) {
                Result res = new Result();
                res.setX(x);
                res.setY(y);
                res.setR(r);
                res.setHit(res.checkHit());
                res.setRequestTime(LocalDateTime.now());
                resultInterface.save(res);
            }
        }
        updateLocal();
    }

    public void addPoint(BigDecimal x, BigDecimal r) {
        addPointFromForm();
    }

    public void clearResults() {
        resultInterface.clear();
        updateLocal();
        currResult = new Result();
        currResult.setX(BigDecimal.ZERO);
        currResult.setR(null);
        y5 = y4 = y3 = y2 = y1 = y0 = y_1 = false;
        this.source = "form";
    }

    // Геттеры и сеттеры
    public Result getCurrResult() { return currResult; }
    public void setCurrResult(Result currResult) { this.currResult = currResult; }

    public List<Result> getResultList() { return resultList; }
    public void setResultList(List<Result> resultList) { this.resultList = resultList; }

    public String getSource() { return source; }
    public void setSource(String source) { this.source = source; }

    public boolean isY5() { return y5; }
    public void setY5(boolean y5) { this.y5 = y5; }

    public boolean isY4() { return y4; }
    public void setY4(boolean y4) { this.y4 = y4; }

    public boolean isY3() { return y3; }
    public void setY3(boolean y3) { this.y3 = y3; }

    public boolean isY2() { return y2; }
    public void setY2(boolean y2) { this.y2 = y2; }

    public boolean isY1() { return y1; }
    public void setY1(boolean y1) { this.y1 = y1; }

    public boolean isY0() { return y0; }
    public void setY0(boolean y0) { this.y0 = y0; }

    public boolean isY_1() { return y_1; }
    public void setY_1(boolean y_1) { this.y_1 = y_1; }
}