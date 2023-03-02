module.exports = class {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    fillter() {
        const objQuery = { ...this.queryString };
        const excludedFields = ["page", "limit", "sort", "fields"];
        excludedFields.forEach((el) => {
            delete objQuery[el];
        });

        let queryString = JSON.stringify(objQuery);
        queryString = queryString.replace(
            /(gt|gte|lt|lte)/g,
            (match) => `$${match}`
        );
        this.query = this.query.find(JSON.parse(queryString));
        return this;
    }
};
