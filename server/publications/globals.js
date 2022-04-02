

Meteor.publish('ogrenci.liste', function (ogrenciId) {
  return Ogrenciler.find({ ogrenciId : ogrenciId });
});
Meteor.publish('yoklama.liste', function () {
  return Yoklamalar.find({ });
});
