import { modelOptions, prop, getModelForClass } from '@typegoose/typegoose'

@modelOptions({ schemaOptions: { timestamps: true } })
export class User {
  public _id?: string
  @prop({ required: true })
  public name!: string
  
  @prop({ required: true, unique: true })
  public email!: string
  @prop({ required: true })
  public password!: string
  @prop({ required: true, default: false })
  public isAdmin!: boolean

  @prop({ required: false })
  public verificationToken!: string
  @prop({ required: true, default: false })
  public isVerified!: boolean

  @prop({ required: true})
  public info!: string
}

export const UserModel = getModelForClass(User)
