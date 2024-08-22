class ApiFeatures {
  constructor(mongooseQuery, Querystring) {
    this.mongooseQuery = mongooseQuery;
    this.Querystring = Querystring;
  }
  pagination() {
    const page = Math.abs(this.Querystring.page * 1) || 1;
    let limit = 5;
    let skip = (page - 1) * limit;
    delete this.Querystring["page"];
    this.mongooseQuery.skip(skip).limit(limit);
    return this;
  }
  filter(filt) {
    let fil = JSON.stringify(this.Querystring);
    fil = fil.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    fil = JSON.parse(fil);
    let filter = {};
    delete fil["page"];
    filter = { ...filt, ...fil };
    this.mongooseQuery.find(filter);
    return this;
  }
  sort_query() {
    if (this.Querystring.sort) {
      let sort = "";
      sort = this.Querystring.sort.split(",").join(" ");
      console.log(sort);
      delete this.Querystring["sort"];
      this.mongooseQuery.sort(sort);
    }
    return this;
  }
  select() {
    if (this.Querystring.select) {
      let selects;
      selects = this.Querystring.select;
      delete this.Querystring["select"];
      this.mongooseQuery.select(selects);
    }
    return this;
  }
  search() {
    if (this.Querystring.search) {
      console.log(this.Querystring.search);
      this.mongooseQuery.find({
        name: { $regex: this.Querystring.search, $options: "i" },
      });
      delete this.Querystring.search;
    }
    return this;
  }
}
module.exports = ApiFeatures;
