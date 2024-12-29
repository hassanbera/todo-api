// Gerekli paketleri dahil et
const express = require('express');
const bodyParser = require('body-parser');

//Express uygulamasını başlat
const app = express();
const PORT= 3000;

// Orta karman JSON formatında gelen istek gövdesini ayrıştırır
app.use(bodyParser.json());

 // Geçici görev veritabanı(kalıcı veritabanı kullanmadık)
 let todos=[
    {id:1, task:'Şınav Çek',completed:false},
    {id:2, task:'Mekik Çek',completed:false}
 ];

 // 1. Görevleri Listeleme(GET/ todos)
 // Tüm görevleri JSON formatında döndürür
 app.get('/todos',(req,res)=>{
    res.json(todos);
 })

 // 2. Yeni Görev Ekleme(POST /todos)
 // İstemciden gelen görev bilgilerini alır ve listeye ekler
 app.post('/todos',(req,res)=>{
    // Yeni görev objesi oluştur
    const newTodo={
        id:todos.length+1,
        task:req.body.task, // Görev adı istemciden alınır
        completed:false // Yeni eklenen görev varsayılan olarak tamamlanmamış olur.
    };
    todos.push(newTodo); // Yeni görevi listeye ekle
    res.status(201).json(newTodo); // Yeni görevi istemciye bildir 201 Created ile yeni görevi döndür.
 });

 // 3. Görev Güncelleme(PUT /todos/:id)
 // Belirtilen ID'ye sahip görevi günceller
 app.put('/todos/:id',(req,res)=>{
    const id = parseInt(req.params.id); // ID parametresini al ve sayıya çevir
    const todo = todos.find(todo=>todo.id===id); // ID'ye sahip görevi bul
    if(!todo){
        return res.status(404).send('Görev bulunamadı.'); // Görev yoksa hata döndür
    }
// Görev adını ve tamamlanma durumunu güncelle
todo.task=req.body.task || todo.task; // Yeni görev adı varsa güncellenir.
todo.completed=req.body.completed!==undefined? req.body.completed:todo.completed; // Tamamlanma durumu güncellenir.
res.json(todo); // Güncellenen görevi döndür

    });

    // 4. Görev Silme(DELETE /todos/:id)
    // Belirtilen ID'ye sahip görevi siler
    app.delete('/todos/:id',(req,res)=>{
        const id = parseInt(req.params.id); // ID parametresini al ve sayıya çevir
        const index = todos.findIndex(todo=>todo.id===id); // ID'ye sahip görevin dizinini bul
        if(index===-1){
            return res.status(404).send('Görev bulunamadı.'); // Görev yoksa hata döndür
        }
        todos.splice(index,1); // Görevi listeden sil
        res.status(204).send(); // 204 No Content ile yanıt döndür
    });

    // Sunucuyu başlat ve belirtilen portta dinlemeye başla
    app.listen(PORT,()=>{
        console.log(`Sunucu http://localhost:${PORT} adresinde çalışıyor`);
    });

