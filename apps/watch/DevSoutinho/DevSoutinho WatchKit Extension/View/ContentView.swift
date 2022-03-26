//
//  ContentView.swift
//  DevSoutinho WatchKit Extension
//
//  Created by Mario Souto on 25/03/22.
//

import SwiftUI

struct ContentView: View {
    // MARK: - PROPERTY
    @State private var notes: [Note] = [Note]()
    @State private var text: String = "";
    
    // MARK: - FUNCTION
    func getDocumentDirectory() -> URL {
        let path = FileManager.default.urls(for: .documentDirectory, in: .userDomainMask);
        return path[0];
    }
    
    func save() {
        // dump(notes)
        do {
            // 1. Convert notes array to data using JSONEncoder
            let data = try JSONEncoder().encode(notes)
            // 2. Create a new URL to save the file using getDocumentDirectory
            let url = getDocumentDirectory().appendingPathComponent("notes")
            // 3. Write the data to that given URL
            try data.write(to: url)
        } catch {
            print("Saving data has failed!")
        }
    }
    
    func load() {
        DispatchQueue.main.async {
            do {
                // 1. Get the notes URL path
                let url = getDocumentDirectory().appendingPathComponent("notes")
                // 2. Create a new property for the data
                let data = try Data(contentsOf: url)
                // 3. Decode the data
                notes = try JSONDecoder().decode([Note].self, from: data)
            } catch {
                print("Loading data has failed!")
            }
        }
    }
    
    func delete(offsets: IndexSet) {
        withAnimation {
            notes.remove(atOffsets: offsets)
            save()
        }
    }
    
    // MARK: - BODY
    var body: some View {
        VStack {
            HStack(alignment: .center, spacing: 6) {
                TextField("Add new note", text: $text)
                Button {
                    // ACTION
                    // 1. Only run the button's action when the text field is not empty
                    guard text.isEmpty == false else { return }
                    // 2. Create a new note item and initialize it with the text value
                    let note = Note(id: UUID(), text: text)
                    // 3. Add the new note item do the array
                    notes.append(note)
                    // 4. Make the text field empty
                    text = ""
                    // 5. Savethe notes (function)
                    save();
                } label: {
                    Image(systemName: "plus.circle")
                        .font(.system(size: 42, weight: .semibold))
                }
                .buttonStyle(PlainButtonStyle())
                .foregroundColor(.accentColor)
            } //: HStack
            if notes.count >= 1 {
                List {
                    ForEach(0..<notes.count, id: \.self) { i in
                        NavigationLink(destination: DetailView(note: notes[i], count: notes.count, index: i)) {
                            HStack {
                                Capsule()
                                    .frame(width: 4)
                                    .foregroundColor(.accentColor)
                                Text(notes[i].text)
                                    .lineLimit(1)
                                    .padding(.leading, 5)
                            }
                        }
                    } //: LOOP
                    .onDelete(perform: delete)
                }
                .padding(.top, 0.3)
            } else {
                Spacer()
                Text("Create your first note 😋")
                Spacer()
            } //: LIST
//            Text("\(notes.count)")
        } //: VSTACK
        .navigationTitle("Notes")
        .navigationBarTitleDisplayMode(.inline)
        .onAppear(perform: {
            load()
        })
    }
}

// MARK: - PREVIEW

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        Group {
            ContentView()
        }
    }
}
