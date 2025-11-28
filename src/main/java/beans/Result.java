package beans;

import java.io.Serializable;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.util.Objects;
import javax.persistence.*;

@Entity
@Table(name = "point_results")
public class Result implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, precision = 10, scale = 4)
    private BigDecimal x;

    @Column(nullable = false, precision = 10, scale = 4)
    private BigDecimal y;

    @Column(nullable = false, precision = 10, scale = 4)
    private BigDecimal r;

    @Column(nullable = false)
    private Boolean hit;

    @Column(name = "request_time", nullable = false)
    private LocalDateTime requestTime;

    // --- Constructors ---

    public Result() {}

    public Result(Result source) {
        this.id = source.id;
        this.x = source.x;
        this.y = source.y;
        this.r = source.r;
        this.hit = source.hit;
        this.requestTime = source.requestTime;
    }

    public Result(BigDecimal x, BigDecimal y, BigDecimal r) {
        this.x = Objects.requireNonNull(x);
        this.y = Objects.requireNonNull(y);
        this.r = Objects.requireNonNull(r);
        this.hit = checkHit();
        this.requestTime = LocalDateTime.now();
    }



    public Boolean checkHit() {
        BigDecimal half = BigDecimal.valueOf(0.5);

        boolean triangle = x.compareTo(BigDecimal.ZERO) >= 0 &&
                y.compareTo(BigDecimal.ZERO) >= 0 &&
                y.compareTo(r.multiply(half).subtract(x.multiply(half))) <= 0;

        boolean circle = x.compareTo(BigDecimal.ZERO) <= 0 &&
                y.compareTo(BigDecimal.ZERO) <= 0 &&
                x.pow(2).add(y.pow(2))
                        .compareTo(r.pow(2).divide(BigDecimal.valueOf(4), 10, RoundingMode.HALF_UP)) <= 0;

        boolean rect = x.compareTo(BigDecimal.ZERO) >= 0 &&
                y.compareTo(BigDecimal.ZERO) <= 0 &&
                x.compareTo(r) <= 0 &&
                y.compareTo(r.negate().multiply(half)) >= 0;

        return triangle || circle || rect;
    }

    public String getStringSuccess() {
        return hit ? "Hit" : "Miss";
    }

    public String getClassSuccess() {
        return hit ? "hit" : "miss";
    }

    // --- Getters/setters ---

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public BigDecimal getX() { return x; }
    public void setX(BigDecimal x) { this.x = x; }

    public BigDecimal getY() { return y; }
    public void setY(BigDecimal y) { this.y = y; }

    public BigDecimal getR() { return r; }
    public void setR(BigDecimal r) { this.r = r; }

    public Boolean getHit() { return hit; }
    public void setHit(Boolean hit) { this.hit = hit; }

    public LocalDateTime getRequestTime() { return requestTime; }
    public void setRequestTime(LocalDateTime t) { this.requestTime = t; }

}
