
import SimpleSchema from 'simpl-schema';

Sınıflar =new Mongo.Collection('sınıflar');
SınıflarSchema = new SimpleSchema({
    name: String,
  
  });
  Sınıflar.attachSchema(SınıflarSchema);
 