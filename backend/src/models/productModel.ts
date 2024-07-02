import { modelOptions, prop, getModelForClass } from '@typegoose/typegoose'

class Image {
  @prop({ required: true })
  public color!: string

  @prop({ required: true, unique: true })
  public color_slug!: string

  @prop({ required: true })
  public main_image!: string

  @prop({ required: true, type: () => [String] })
  public images_gallery!: string[]
}

@modelOptions({ schemaOptions: { timestamps: true } })
export class Product {
  public _id?: string

  @prop({ required: true })
  public name!: string

  @prop({ required: true, unique: true })
  public slug!: string

  @prop({ required: true, type: () => [Image] })
  public images!: Image[]

  @prop({ required: true })
  public brand!: string

  @prop({ required: true })
  public category!: string

  @prop({ required: true })
  public type!: string

  @prop({ required: true })
  public description!: string

  @prop({ required: true, default: 0 })
  public price!: number

  @prop({ required: true, default: 0 })
  public discount!: number

  @prop({ required: true, default: 0 })
  public quantity!: number

  @prop({ required: true, default: 0 })
  public rating!: number

  @prop({ required: true, default: 0 })
  public numReviews!: number
}

export const ProductModel = getModelForClass(Product)
