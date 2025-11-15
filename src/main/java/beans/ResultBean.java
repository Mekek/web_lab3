//package beans;
//
//import database.ResultInterface;
//
//import javax.annotation.ManagedBean;
//import javax.annotation.PostConstruct;
//import javax.enterprise.context.SessionScoped;
//import javax.inject.Inject;
//import javax.inject.Named;
//import java.io.Serializable;
//import java.math.BigDecimal;
//import java.time.LocalDateTime;
//import java.util.ArrayList;
//import java.util.List;
//
//@Named("results")
//@SessionScoped
//public class ResultBean implements Serializable {
//
//    @Inject
//    private ResultInterface resultInterface;
//
//    private Result currResult;
//    private List<Result> resultList;
//    private String source;
//
//    // ---------- boolean поля для каждого Y ----------
//    private boolean yMinus5;
//    private boolean yMinus4;
//    private boolean yMinus3;
//    private boolean yMinus2;
//    private boolean yMinus1;
//    private boolean y0;
//    private boolean y1;
//
//    public ResultBean() {}
//
//
//    @PostConstruct
//    private void initialize() {
//        currResult = new Result();
//        currResult.setX(BigDecimal.ZERO);
//        currResult.setR(null);
//        updateLocal();
//    }
//
//    private void updateLocal() {
//        resultList = resultInterface.getAll();
//    }
//
//    // ---------- Логика ----------
//    public List<BigDecimal> getSelectedYValues() {
//        List<BigDecimal> selected = new ArrayList<>();
//        if (yMinus5) selected.add(BigDecimal.valueOf(-5));
//        if (yMinus4) selected.add(BigDecimal.valueOf(-4));
//        if (yMinus3) selected.add(BigDecimal.valueOf(-3));
//        if (yMinus2) selected.add(BigDecimal.valueOf(-2));
//        if (yMinus1) selected.add(BigDecimal.valueOf(-1));
//        if (y0)      selected.add(BigDecimal.valueOf(0));
//        if (y1)      selected.add(BigDecimal.valueOf(1));
//        return selected;
//    }
//
//    public void addPoint(BigDecimal x, BigDecimal r) {
//        List<BigDecimal> ys = getSelectedYValues();
//        if (x == null || r == null || ys.isEmpty()) return;
//
//        for (BigDecimal y : ys) {
//            Result res = new Result();
//            res.setX(x);
//            res.setY(y);
//            res.setR(r);
//            res.setHit(res.checkHit());
//            res.setRequestTime(LocalDateTime.now());
//            resultInterface.save(res);
//        }
//
//        updateLocal();
//    }
//
//    public void clearResults() {
//        resultInterface.clear();
//        updateLocal();
//
//        currResult = new Result();
//        currResult.setX(BigDecimal.ZERO);
//        currResult.setR(null);
//
//        yMinus5 = yMinus4 = yMinus3 = yMinus2 = yMinus1 = y0 = y1 = false;
//    }
//
//    // ---------- Геттеры/Сеттеры ----------
//    public Result getCurrResult() { return currResult; }
//    public void setCurrResult(Result currResult) { this.currResult = currResult; }
//
//    public List<Result> getResultList() { return resultList; }
//    public void setResultList(List<Result> resultList) { this.resultList = resultList; }
//
//    public String getSource() { return source; }
//    public void setSource(String source) { this.source = source; }
//
//    // ЗАМЕНА: isYMinus5() -> getYMinus5() и т.д.
//    public boolean getYMinus5() { return yMinus5; }
//    public void setYMinus5(boolean yMinus5) { this.yMinus5 = yMinus5; }
//
//    public boolean getYMinus4() { return yMinus4; }
//    public void setYMinus4(boolean yMinus4) { this.yMinus4 = yMinus4; }
//
//    public boolean getYMinus3() { return yMinus3; }
//    public void setYMinus3(boolean yMinus3) { this.yMinus3 = yMinus3; }
//
//    public boolean getYMinus2() { return yMinus2; }
//    public void setYMinus2(boolean yMinus2) { this.yMinus2 = yMinus2; }
//
//    public boolean getYMinus1() { return yMinus1; }
//    public void setYMinus1(boolean yMinus1) { this.yMinus1 = yMinus1; }
//
//    public boolean getY0() { return y0; }
//    public void setY0(boolean y0) { this.y0 = y0; }
//
//    public boolean getY1() { return y1; }
//    public void setY1(boolean y1) { this.y1 = y1; }
//}