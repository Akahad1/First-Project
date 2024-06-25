import { FilterQuery, Query } from "mongoose";

class QureyBuilder<T> {
  public modelQurey: Query<T[], T>;
  public qurey: Record<string, unknown>;
  constructor(modelQurey: Query<T[], T>, qurey: Record<string, unknown>) {
    this.modelQurey = modelQurey;
    this.qurey = qurey;
  }

  search(searchAbleFields: string[]) {
    const searchTerm = this?.qurey?.searchTerm;
    if (searchTerm) {
      this.modelQurey = this.modelQurey.find({
        $or: searchAbleFields.map(
          (field) =>
            ({
              [field]: { $regex: searchTerm, $options: "i" },
            }) as FilterQuery<T>
        ),
      });
    }

    return this;
  }

  filter() {
    const qurObj = { ...this.qurey };
    const excludeFields = ["searchTerm", "sort", "limit", "page", "fields"];
    excludeFields.forEach((el) => delete qurObj[el]);
    this.modelQurey = this.modelQurey.find(qurObj as FilterQuery<T>);

    return this;
  }

  sort() {
    let sort =
      (this.qurey?.sort as string)?.split(",")?.join(" ") || "-createdAt";
    this.modelQurey = this.modelQurey.sort(sort as string);
    return this;
  }
  paginaet() {
    let page = Number(this.qurey.page) || 1;
    let limit = Number(this.qurey.limit) || 0;
    let skip = (page - 1) * limit;

    this.modelQurey = this.modelQurey.skip(skip).limit(limit);
    return this;
  }

  fields() {
    const field =
      (this.qurey?.fields as string)?.split(",")?.join(" ") || "-__v";
    this.modelQurey = this.modelQurey.select(field);
    return this;
  }
}

export default QureyBuilder;
