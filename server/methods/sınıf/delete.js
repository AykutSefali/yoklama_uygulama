import SimpleSchema from 'simpl-schema';

new ValidatedMethod({
  name: 'sinif.delete',
  validate: new SimpleSchema({
    _id: SimpleSchema.RegEx.Id
  }).validator(),
  run: async function (data) {
    this.unblock();
    const { _id } = data;

    Sınıflar.remove({ _id: _id });
  }
});




