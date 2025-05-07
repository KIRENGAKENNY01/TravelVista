    package com.T_Tour.Tourism.models;

    import jakarta.persistence.*;
    import jakarta.validation.constraints.NotBlank;
    import lombok.AllArgsConstructor;
    import lombok.Builder;
    import lombok.Data;
    import lombok.NoArgsConstructor;
    import org.hibernate.annotations.CreationTimestamp;

    import java.util.Date;


    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    @Entity
    @Table(name = "review")
    public class  Review {
        @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
      private Integer reviewID;


    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;


    @ManyToOne
    @JoinColumn(name = "attraction_id",  nullable = false)
    private TouristicAttraction attraction;

    @NotBlank(message = "user name is required")
    @Column(name = "name",length = 255,nullable = false)
    private String name;


    private int rating;

    @NotBlank(message = "comment is required")
    @Column(name = "user_name",length = 255,nullable = false)
    private String comment;

        @CreationTimestamp
        private Date date;
        }

