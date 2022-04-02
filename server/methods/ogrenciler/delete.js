import SimpleSchema from 'simpl-schema';

new ValidatedMethod({
  name: 'ogrenci.delete',
  validate: new SimpleSchema({
    _id: SimpleSchema.RegEx.Id
  }).validator(),
  run: async function (data) {
    this.unblock();
    const { _id } = data;

    Ogrenciler.remove({ _id: _id });
  }
});




