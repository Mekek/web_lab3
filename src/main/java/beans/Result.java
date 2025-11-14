package beans;

import lombok.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.util.Objects;
import javax.persistence.*;

/**
 * Represents the result of checking a point in the coordinate area.
 */
@Entity
@Table(name = "point_results")
@Getter
@Setter
@ToString
@AllArgsConstructor
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

    /** Copy constructor */
    public Result(Result source) {
        this.id = source.id;
        this.x = source.x;
        this.y = source.y;
        this.r = source.r;
        this.hit = source.hit;
        this.requestTime = source.requestTime;
    }

    public Result() {
        // Пустой конструктор нужен для JSF/Hibernate
    }

    /** Constructor from coordinates */
    public Result(BigDecimal x, BigDecimal y, BigDecimal r) {
        this.x = Objects.requireNonNull(x, "x cannot be null");
        this.y = Objects.requireNonNull(y, "y cannot be null");
        this.r = Objects.requireNonNull(r, "r cannot be null");
        this.hit = checkHit();
        this.requestTime = LocalDateTime.now();
    }

    // --- Logic ---

    /** Checks whether the point falls within the area */
    public Boolean checkHit() {
        BigDecimal half = BigDecimal.valueOf(0.5);
        BigDecimal x = this.x;
        BigDecimal y = this.y;
        BigDecimal r = this.r;

        boolean triangle = x.compareTo(BigDecimal.ZERO) >= 0
                && y.compareTo(BigDecimal.ZERO) >= 0
                && y.compareTo(r.multiply(half).subtract(x.multiply(half))) <= 0;

        boolean circle = x.compareTo(BigDecimal.ZERO) <= 0
                && y.compareTo(BigDecimal.ZERO) <= 0
                && x.pow(2).add(y.pow(2))
                .compareTo(r.pow(2).divide(BigDecimal.valueOf(4), 10, RoundingMode.HALF_UP)) <= 0;

        boolean rectangle = x.compareTo(BigDecimal.ZERO) >= 0
                && y.compareTo(BigDecimal.ZERO) <= 0
                && x.compareTo(r) <= 0
                && y.compareTo(BigDecimal.ZERO.subtract(r.multiply(half))) >= 0;

        return triangle || circle || rectangle;
    }

    /** Returns string for table display */
    public String getStringSuccess() {
        return hit ? "Hit" : "Miss";
    }

    /** Returns CSS class for table row styling */
    public String getClassSuccess() {
        return hit ? "hit" : "miss";
    }

    public void setX(BigDecimal x) { this.x = x; }

    public void setY(BigDecimal y) { this.y = y; }

    public void setR(BigDecimal r) { this.r = r; }

    public void setHit(Boolean hit) { this.hit = hit; }

    public void setRequestTime(LocalDateTime t) { this.requestTime = t; }
}
