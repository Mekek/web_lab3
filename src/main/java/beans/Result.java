package beans;

import lombok.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;
import javax.persistence.*;

/**
 * This class represents the result of checking a point for inclusion in a specified coordinate area.
 */
@Entity
@ToString
@NoArgsConstructor
public class Result implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Long id;
    @Column(name = "x", nullable = false)
    private BigDecimal x;
    @Column(name = "y", nullable = false)
    private BigDecimal y;
    @Column(name = "r", nullable = false)
    private BigDecimal r;
    @Column(name = "hit", nullable = false)
    private Boolean hit;
    @Column(name = "request_time", nullable = false)
    private String requestTime;

    /**
     * Creates a new instance of the Result class based on an existing Result object.
     *
     * @param sourceResult The source Result object used to create a new instance.
     */
    public Result(Result sourceResult) {
        this.id = sourceResult.id;
        this.x = sourceResult.getX();
        this.y = sourceResult.getY();
        this.r = sourceResult.getR();
        this.hit = checkHit();
        this.requestTime = sourceResult.requestTime;
    }

    /**
     * Checks whether the point falls within the specified coordinate area.
     *
     * @return true if the point falls within the area, false otherwise.
     */
    private Boolean checkHit() {
        BigDecimal x = new BigDecimal(String.valueOf(this.x).replace(',', '.'));
        BigDecimal y = new BigDecimal(String.valueOf(this.y).replace(',', '.'));
        BigDecimal r = new BigDecimal(String.valueOf(this.r).replace(',', '.'));

        boolean triangle = x.compareTo(BigDecimal.ZERO) >= 0
                && y.compareTo(BigDecimal.ZERO) <= 0
                && y.compareTo(r.add(x)) <= 0;

        boolean circle = x.compareTo(BigDecimal.ZERO) <= 0
                && y.compareTo(BigDecimal.ZERO) <= 0
                && x.pow(2).add(y.pow(2)).compareTo(r.pow(2)) <= 0;

        boolean rectangle = x.compareTo(BigDecimal.ZERO) >= 0
                && y.compareTo(BigDecimal.ZERO) <= 0
                && x.compareTo(r.divide(BigDecimal.valueOf(2))) <= 0
                && y.compareTo(BigDecimal.ZERO.subtract(r)) >= 0;

        return (Boolean) (triangle || circle || rectangle);
    }

    /**
     * Returns a string representation of the result.
     *
     * @return "Hit" for inclusion and "Miss" for exclusion.
     */
    public String getStringSuccess() {
        return hit ? "Hit" : "Miss";
    }

    /**
     * Returns the classification of the result (hit or miss).
     *
     * @return "Hit" for inclusion and "Miss" for exclusion.
     */
    public String getClassSuccess() {
        return hit ? "hit" : "miss";
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public BigDecimal getX() {
        return x;
    }

    public void setX(BigDecimal x) {
        this.x = x;
    }

    public BigDecimal getY() {
        return y;
    }

    public void setY(BigDecimal y) {
        this.y = y;
    }

    public BigDecimal getR() {
        return r;
    }

    public void setR(BigDecimal r) {
        this.r = r;
    }

    public boolean getHit() {
        return hit;
    }

    public void setHit(Boolean hit) {
        this.hit = hit;
    }

    public String getRequestTime() {
        return requestTime;
    }

    public void setRequestTime(String requestTime) {
        this.requestTime = requestTime;
    }
}