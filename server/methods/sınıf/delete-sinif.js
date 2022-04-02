import SimpleSchema from 'simpl-schema';

new ValidatedMethod({
  name: 'sinifogrenci.delete',
  validate: new SimpleSchema({
    ogrenciId: SimpleSchema.RegEx.Id
  }).validator(),
  run: async function (data) {
    this.unblock();
    const { ogrenciId } = data;


    Ogrenciler.remove({ ogrenciId: ogrenciId });
  }
});




