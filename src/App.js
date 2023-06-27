import { useState } from "react";
import BookCard from "./components/BookCard";
import { toast } from 'react-toastify';
import EditModal from "./components/EditModal";


function App() {
  const [bookName, setBookName] = useState('');
  const [books, setBooks] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editItem, setEditItem] = useState(null);

  console.log(showEditModal, editItem);

//  ekle butonuna tıklandığı anda çalışır
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!bookName) {
      toast.warn('Lütfen Kitap İsmi Giriniz', { autoClose: 2000 })
      return;
    }
//! kitap için gerekli bilgilere sahip objeyi oluşturma
    const newBook = {
      id: new Date().getTime(),
      title: bookName,
      date: new Date().toLocaleString(),
      isRead: false,
    };
  //  oluşturulan kitap objesini kitaplar dizisine aktar
  //  spread operatör önceden eklenenleri muhafaza eder
    setBooks([...books, newBook]);

    // eleman eklenince inputu sıfırla
    setBookName('');
    
    // bildirim ver
    toast.success('Kitap Eklendi', {autoClose: 3000 });
  };

  // modalı ele alma
  const handleModal = (id) => {
// id yi state aktarma
    setDeleteId(id);
    // modalı açma

    setShowConfirm(true);
  };
  // sil butonuna basınca çalışır
  const handleDelete = (deletingId) => {
   const filtred = books.filter((item) => item.id !== deletingId);
    setBooks(filtred); 

    // bildirim ver
    toast.error('Kitap silindi', {autoClose: 3000 });
  };

  //Okundu butonuna basınca çalışır
  // 1 okundu değerini tersine çevirme
  // 2 books dizisini bir kopyasını oluştur
  // 3 düzenlenecek olan kitabın dizideki sırasını bul
  // 4 eski kitabı kopya diziden çıkar yerine güncellenmiş versiyonu koy
  // 5 güncel olan kopya diziyi state aktar
  // okundu değerini tersine çevirme

  const handleRead = (book) => {
    const updatedBook = { ...book, isRead: !book.isRead };
     
    const cloneBooks = [...books];

    const index = books.findIndex((item) => item.id === book.id);


    console.log(index);

    cloneBooks.splice(index, 1, updatedBook);

    console.log(cloneBooks);
    setBooks(cloneBooks);
  };

  // kitabı güceller
  const handleEditBook = () => {
    // değişecek elemanın dizideki sırasini bulur
const index = books.findIndex((book)=> book.id === editItem.id)
   
    // kitaplar dizisinin kopyasını oluşturma
    const cloneBooks = [...books];

    // eski kitabı diziden çıkar yerin eyenisini koy
    cloneBooks.splice(index, 1, editItem);

    // statei güncelle > kopya diziyi state aktar
    setBooks(cloneBooks);

    // modal ı kapat
    setShowEditModal(false);
    
  };
  return (
    <div>
      {/* header */}
      <div className="bg-dark text-light px-5 py-2 fs-5 text-center">Kitap Kurdu </div>
      {/* container alanı */}
      <div className="container border">
        {/* form alanı  */}
        <form onSubmit={handleSubmit} className="d-flex gap-3 mt-4">
          <input onChange={(e) => setBookName(e.target.value)}
            value={bookName} className="form-control shadow" type="text" />
          <button className="btn btn-warning shadow">Ekle</button>
        </form>
        <div className="d-flex flex-column gap-3 py-5">
          {/* eğer state içerisi boş ise bunu yaz */}
          
          {books.length === 0 && <h4>Henüz herhangi bir kitap eklenmedi</h4>}
        
          {/* eğer state içinde eleman varsa onları listele */}
          {books.map((book) => (
            <BookCard
            key={book.id}
              book={book}
              handleModal={handleModal}
              handleRead={handleRead}
              setShowEditModal={setShowEditModal}
              setEditItem={setEditItem}
            />
          ))}
        </div>
      </div>
      {/* modal tanımlama */}
      {showConfirm && (
        <div className="confirm-modal">
          <div className="modal-inner shadow">
          <h5>Silmek istiyor musunuz ?</h5>
          <button className="btn btn-warning" onClick={() => setShowConfirm(false)}>vazgeç</button>
          <button className="btn btn-danger" onClick={() => {
            handleDelete(deleteId);
            setShowConfirm(false);
            }}>Onayla</button>
            </div>
        </div>
      )}
      {/* düzenleme Modalı */}
      {showEditModal &&
        <EditModal setShowEditModal={setShowEditModal}
          setEditItem={setEditItem}
        editItem={editItem}
        handleEditBook={handleEditBook}
        />}
      
    </div>
  );
      
}

export default App;
