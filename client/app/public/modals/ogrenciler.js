
 
Template.addogrenci.events({


  'submit form#brdYoklamaFormu': function (event, template) {
    event.preventDefault();
    
    const ogrencilerChecked = $('.brd-class-ogrenciler input').map(function () { //each sadece isim şeklinde gelir
      if (this.checked) {
        return this.value

      }

    });
    const ogrencilerNotChecked = $('.brd-class-ogrenciler input').map(function () { //each sadece isim şeklinde gelir
      if (!this.checked) {
        return this.value

      }

    });
      
    const tarih = event.target.yoklamatarihi.value;
  
    const checkedNotArrayId = Array.from(ogrencilerNotChecked);
    const checkedArrayId = Array.from(ogrencilerChecked);
    //console.log('checkedNotArrayId',checkedNotArrayId)
    template.state.set('yoklamalar', checkedArrayId);
   

    for (let i = 0; i < checkedNotArrayId.length; i++) {
      
      const obj = {
        yoklamasil: {
          yoklamaTarihi: tarih.toString(),
          ogrenciId: checkedNotArrayId[i]

        },

      }
    Meteor.call('yoklama.delete', obj, function (error, result) {
     
     
      if (error) {
        ErrorHandler.show(error)
        return;
      }

     
    });
  
    }
    
  
    
  
    for (let i = 0; i < ogrencilerChecked.length; i++) {

     
      const obj = {
        yoklama: {
          yoklamaTarihi: tarih.toString(),
          ogrenciId: ogrencilerChecked[i]

        },

      }
 
     
      Meteor.call('update.yoklama', obj, (err, res) => {

        if (err) {
          alert(err);
        } else {

          
          //console.log('basarıli:',res)
        }
      });
    }
    AppUtil.refreshTokens.set('yoklamalar', Random.id());
  },

    
  'change .brd-date': function (event, template) {
    const result=Yoklamalar.find({}).fetch();
   
   /* var checkedTags = $('input[type="checkbox"]').map(function(){
      return $(this).val();
    });*/
    
    const ogrencilerCheckAll = $('.brd-class-ogrenciler input').map(function () { //each sadece isim şeklinde gelir
     
        return this.value


    });
    const checkTrueFalse = $('.brd-class-ogrenciler input').map(function () { //each sadece isim şeklinde gelir
     
      return this.checked


  });

   
   const trueFalse = Array.from(checkTrueFalse);

    const ogrencilerCheckAllId = Array.from(ogrencilerCheckAll);
    const tarih = event.target.value;
    const d = tarih.toString();

    for(let i=0;i<result.length;i++){
      if(ogrencilerCheckAllId[i]==result[i].ogrenciId && result[i].yoklamaTarihi==d)
      {

       
        
      }
      else{
      
      }
    

  }
 
  },
  'change .brd-select': function (event, template) {

    let value = event.target.value;

    template.state.set('sinif', value)
    //console.log( template.state.get('sinif'))
  },

  /* 'click .brd-select-option':function(event,template){
    
    template.state.set('sinif',this)
    
  },
*/
  'submit form#brdOgrenciCreateForm': function (event, template) {
    event.preventDefault()

    const ogrenciid = template.state.get('sinif');
    const name=event.target.oname.value;
    
    if(name==''){
      return;
    }
    const obj = {
        
      ogrenci: {
        ogrenciId: ogrenciid,
        name: name
      }
    }
    Meteor.call('insert.ogrenci', obj, (err, res) => {
      if (err) {
        alert(err);
      } else {
        AppUtil.refreshTokens.set('ogrenciler', Random.id());
        event.target.oname.value='';
        console.log('basarıli:', res)
      }
    });

  },

});

//Öğrencileri Listeleme
Template.addogrenci.onCreated(function () {

  this.state = new ReactiveDict(null, {
    yoklamalar: null,
    sinif: null,
    siniflar: [],
    ogrenciler: [],
  });

});
Template.addogrenci.helpers({
  yoklamalar: function () {
    const result = Yoklamalar.find({}).fetch();
   
    return result;
  }
});
Template.addogrenci.onRendered(function () {

  const self = this;
  
  this.autorun(function () {
      const yoklama = self.state.get('yoklamalar');
      AppUtil.refreshTokens.get('yoklamalar');
      if (!yoklama) {
        return;
      }

    
      self.messageSub = Meteor.subscribe('yoklama.liste');
    }),

    this.autorun(function () {

      AppUtil.refreshTokens.get('ogrenciler');
      const sinif = self.state.get('sinif') //Sınıfın var olma durumunu kontrol için ekledim
      if (!sinif) {

        return;
      }
      const obj = {
        options: {
          filtering: {
            ogrenciId: sinif
          }
        },

      }


      Meteor.call('ogrenci.list', obj, function (err, res) {
        if (err) {
          alert(err);
        }

        self.state.set('ogrenciler', res.ogrenciler)

      })

    });

  this.autorun(function () {
    AppUtil.refreshTokens.get('siniflar');

    Meteor.call('sinif.list', {}, function (error, result) {

      if (error) {
        console.log(error);
        return;
      }

      self.state.set('siniflar', result.siniflar)


    });
  });

  this.autorun(function () {
    AppUtil.refreshTokens.get('yoklamalar');

    Meteor.call('yoklama.list', {}, function (error, result) {

      if (error) {
        console.log(error);
        return;
      }

      self.state.set('yoklamalar', result.yoklamalar)


    });
  });


});