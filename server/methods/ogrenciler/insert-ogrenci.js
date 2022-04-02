import SimpleSchema from 'simpl-schema';

new ValidatedMethod({
  name: 'insert.ogrenci',
  validate: new SimpleSchema({
  ogrenci: OgrencilerSchema.omit('userId')
  }).validator(),
  run: function (data) {
    this.unblock();
    const { ogrenci } = data

    ogrenci.userId=Meteor.userId();

    
    const id = Ogrenciler.insert(ogrenci);
    return Ogrenciler.findOne({ _id: id }); 
  }
});