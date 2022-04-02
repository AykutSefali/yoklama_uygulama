import SimpleSchema from 'simpl-schema';

new ValidatedMethod({
  name: 'update.yoklama',
  validate: new SimpleSchema({
    yoklama:YoklamalarSchema
  }).validator(),
  run: function (data) {
    this.unblock();
    const { yoklama } = data
    const query={
      yoklamaTarihi:yoklama.yoklamaTarihi,
      ogrenciId:yoklama.ogrenciId,

    }
   /* const update={
      
      yoklamaTarihi:yoklama.yoklamaTarihi,
      ogrenciId:yoklama.ogrenciId,
      
    }*/
    
    const id = Yoklamalar.update(query,
      {
        $set: yoklama
      }
      ,{upsert:true});
   

    
    return Yoklamalar.findOne({ _id: id });
  }
});
/*
import SimpleSchema from 'simpl-schema';

new ValidatedMethod({
  name: 'insert.yoklama',
  validate: new SimpleSchema({
    yoklama:YoklamalarSchema.omit('ogrenciId'),
    
    ogrenciler: {
      type: Array,
     
    },
  
    'ogrenciler.$': String

  }).validator(),
  run: function (data) {
    this.unblock();
    console.log(data)
    const { yoklama } = data;

   const res=data.ogrenciId.map(ogrenciid => {
      const obj ={
        yoklamaTarihi:yoklama.yoklamaTarihi,
        ogrenciId:ogrenciid,
  
      }
      const id = Yoklamalar.insert(yoklama);
      return Yoklamalar.findOne({ _id: id });
    });
   
    return res;
   
   
  }
});*/