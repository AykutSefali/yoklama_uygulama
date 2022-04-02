import SimpleSchema from 'simpl-schema';

new ValidatedMethod({
  name: 'insert.sinif',
  validate: new SimpleSchema({
    sinif:SınıflarSchema
  }).validator(),
  run: function (data) {
    this.unblock();
    const { sinif } = data

    const id = Sınıflar.insert(sinif);
    return Sınıflar.findOne({ _id: id });
  }
});