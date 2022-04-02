
import SimpleSchema from 'simpl-schema';

Ogrenciler =new Mongo.Collection('ogrenciler');
OgrencilerSchema = new SimpleSchema({
    name: String,
    userId: SimpleSchema.RegEx.Id,
    ogrenciId:SimpleSchema.RegEx.Id,
  
   
  });
  Ogrenciler.attachSchema(OgrencilerSchema);
