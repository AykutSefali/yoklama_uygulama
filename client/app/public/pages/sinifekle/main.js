
import { Template } from 'meteor/templating';


import './main.html';


Template.add.events({
  'click .brd-delete': function (event, template) {
    event.preventDefault();
    const sinif = this;

   console.log('sinif._id',sinif._id)
    Meteor.call('sinif.delete', { _id: sinif._id }, function (error, result) {
      

      if (error) {
        ErrorHandler.show(error)
        return;
      }

      AppUtil.refreshTokens.set('siniflar', Random.id());
    });
/////////////////////////////////////////////////////////////////////////////
   
    Meteor.call('sinifogrenci.delete', { ogrenciId: sinif._id }, function (error, result) {
      

      if (error) {
        ErrorHandler.show(error)
        return;
      }

      
    });
  },
  'click .brd-delete-ogrenci': function (event, template) {
    event.preventDefault();
    const ogrenci = this;

   
    Meteor.call('ogrenci.delete', { _id: ogrenci._id }, function (error, result) {
      

      if (error) {
        ErrorHandler.show(error)
        return;
      }

      AppUtil.refreshTokens.set('', Random.id());
    });
  },
  'submit form#brdSınıfcreateForm':function(event ){
    event.preventDefault()
    const obj={
      
      sinif:{
        name: event.target.sname.value
      }
    }
    Meteor.call('insert.sinif',obj, (err, res) => {
      if (err) {
        alert(err);
      } else {

        AppUtil.refreshTokens.set('siniflar', Random.id());
       console.log('basarıli:',res)
       event.target.reset();
      }
    });
   
  },
  'submit form#brdOgrenciCreateForm':function(event,template ){ 
    event.preventDefault()
    
    const ogrenciid= template.state.get('sinif');
    const obj={
      
      ogrenci:{
        ogrenciId: ogrenciid._id,
        name: event.target.oname.value
      } 
    }
    Meteor.call('insert.ogrenci',obj, (err, res) => {
      if (err) {
        alert(err);
      } else {
        event.target.reset();
       console.log('basarıli:',res)
      }
    });
   
  },
  'click .brd-sinif-select':function(event,template){
    event.preventDefault()
    //console.log(event.target.dataset.id);
  
    template.state.set('sinif',this)
  }
  });
  
//Sınıfları listeleyen methodlar
Template.add.onCreated(function(){

  this.state = new ReactiveDict(null, {
  
      siniflar: [],
      sinif:null,
  });
  
});
Template.add.helpers({
  ogrenciler: function() {
    const result=Ogrenciler.find({}).fetch();
  // console.log('res',result) //Array dönüyor
    return result;
  }
});
Template.add.onRendered(function () {
    const self = this; 

    this.autorun(function() {
      const sinif = self.state.get('sinif');
  
      if (!sinif) {
        return;
      }
  
   
      self.messageSub = Meteor.subscribe('ogrenci.liste', sinif._id);
    })


    this.autorun(function () {
      AppUtil.refreshTokens.get('siniflar');
  
      Meteor.call('sinif.list', {}, function (error, result) {
  
        if (error) {
          console.log(error);
          return;
        }
  
        self.state.set('siniflar',result.siniflar)
       
      
      });
    });
  });
  