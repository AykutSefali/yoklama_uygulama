import SimpleSchema from 'simpl-schema';

new ValidatedMethod({
  name: 'yoklama.delete',
  validate: new SimpleSchema({
    yoklamasil: YoklamalarSchema
  }).validator(),
  run: async function (data) {
    this.unblock();
    const { yoklamasil } = data;
    
    const query={
      yoklamaTarihi:yoklamasil.yoklamaTarihi,
      ogrenciId:yoklamasil.ogrenciId,

    }
    
    Yoklamalar.remove(query,{  $set: yoklamasil });
  }
});




