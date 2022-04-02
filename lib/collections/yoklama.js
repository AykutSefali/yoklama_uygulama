
import SimpleSchema from 'simpl-schema';

Yoklamalar =new Mongo.Collection('yoklamalar');
YoklamalarSchema = new SimpleSchema({
    yoklamaTarihi: String,
    ogrenciId: SimpleSchema.RegEx.Id,
   
   /* {
      type: SimpleSchema.RegEx.Id,
      
    },
    'ogrenciId.$': String*/
   
  });
  Yoklamalar.attachSchema(YoklamalarSchema);
