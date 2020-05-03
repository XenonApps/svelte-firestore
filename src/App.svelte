<script>
  import { Contact } from "./model/contact.js";
  import {
    FirestoreCollection,
    addListener
  } from "./firebase/firestore-collection.js";

  let contact;
  let id;

  // listen for realtime updates
  let unsub = addListener("contacts", changes => {
    console.log(changes);
  });

  let contactsDb = new FirestoreCollection("contacts");

  // Get all contacts with predicate /////////////////////////////////
  // contactsDb.getAll(["lastName", "==", "Styles"]).then(contacts => {
  //   contacts.forEach(c => {
  //     // contactsDb.update(c.id, {
  //     //   message: "Your monthly subscription is overdue"
  //     // });
  //     contactsDb.deleteFields(c.id, ["message"]);
  //   });
  // });
  //////////////////////////////////////////////////////

  // Get a contact /////////////////////////////////////
  // id = "WJRNmid87V4nkYXEiCcz";
  // contactsDb.get(id).then(doc => (contact = Contact.fromObject(doc.data)));
  //////////////////////////////////////////////////////

  // Add a contact /////////////////////////////////////
  // contact = new Contact("Harry", "Styles", ["+44 5643 908564"]);

  // console.log("contact instanceof Contact:", contact instanceof Contact);
  // console.log(contact.toObject());

  // contactsDb.add(contact.toObject()).then(response => {
  //   id = response.id;
  // });
  ////////////////////////////////////////////////////////
</script>

<style>
  main {
    text-align: center;
    padding: 1em;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }
</style>

<main>
  <h1>Firestore Play!</h1>
  <!-- <p>name: {contact ? contact.fullName() : undefined}, id: {id}</p> -->
  <!-- <button on:click={unsub}>Unregister Listener</button> -->
</main>
