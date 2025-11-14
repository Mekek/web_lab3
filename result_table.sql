CREATE TABLE point_results (
                               id SERIAL PRIMARY KEY,
                               x NUMERIC NOT NULL,
                               y NUMERIC NOT NULL,
                               r NUMERIC NOT NULL,
                               hit BOOLEAN NOT NULL,
                               created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
