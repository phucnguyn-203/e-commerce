module.exports = class {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    filter() {
        const objQuery = { ...this.queryString };
        const excludedFields = ["page", "limit", "sort", "fields", "search"];
        excludedFields.forEach((el) => {
            delete objQuery[el];
        });

        let queryString = JSON.stringify(objQuery);
        queryString = queryString.replace(
            /\b(gt|gte|lt|lte)\b/g,
            (match) => `$${match}`
        );
        queryString = JSON.parse(queryString);
        if (this.queryString.search) {
            const q = this.queryString.search.replace(
                /[-\/\\^$*+?.()|[\]{}]/g,
                "\\$&"
            );
            const filter = {
                $and: [{ name: { $regex: new RegExp(q, "i") } }, queryString],
            };
            this.query = this.query.find(filter);
        } else {
            this.query = this.query.find(queryString);
        }
        return this;
    }
    sort() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(",").join(" ");
            this.query = this.query.sort(sortBy);
        }
        return this;
    }
    limitFields() {
        if (this.queryString.fields) {
            const fields = this.queryString.fields.split(",").join(" ");
            this.query = this.query.select(fields);
        } else {
            this.query = this.query.select("-__v");
        }
        return this;
    }
    paginate() {
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 10;
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit);
        return this;
    }
};
