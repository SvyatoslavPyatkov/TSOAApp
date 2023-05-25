const dbConfig = {
    HOST: "localhost",
    PORT: "5433",
    USER: "postgres",
    PASSWORD: "postgres",
    DB: "db_learner_records",
    dialect: "postgres",
    define: {
        timestamps: false
    }
};

export default dbConfig;