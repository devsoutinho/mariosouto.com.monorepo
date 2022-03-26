//
//  DetailView.swift
//  DevSoutinho WatchKit Extension
//
//  Created by Mario Souto on 25/03/22.
//

import SwiftUI

struct DetailView: View {
    // MARK: - PROPERTY
    let note: Note
    let count: Int
    let index: Int
    
    @State private var isCreditsPresented = false;
    
    // MARK: - FUNCTION
    
    // MARK: - BODY
    var body: some View {
        VStack(alignment: .center, spacing: 3) {
            // HEADER
            HStack {
                Capsule()
                    .frame(height: 1)
                Image(systemName: "note.text")
                Capsule()
                    .frame(height: 1)
            } //: HSTACK
            .foregroundColor(.accentColor)
            
            // CONTENT
            Spacer()
            ScrollView(.vertical) {
                Text(note.text)
                    .font(.title3)
                    .fontWeight(.semibold)
            }
            Spacer()
            // FOOTER
            HStack{
                Image(systemName: "gear")
                    .imageScale(.large)
                Spacer()
                Text("\(index + 1) / \(count)")
                Spacer()
                Image(systemName: "info.circle")
                    .imageScale(.large)
                    .onTapGesture {
                        isCreditsPresented.toggle();
                    }
                    .sheet(isPresented: $isCreditsPresented, content: {
                        CreditsView();
                    })
            }//: HSTACK
            .foregroundColor(.secondary)
        } // :VSTACK
        .padding(3)
    }
}

// MARK: - PREVIEW
struct DetailView_Previews: PreviewProvider {
    static var sampleNote: Note = Note(id: UUID(), text: "Hello World")
    
    static var previews: some View {
        DetailView(note: sampleNote, count: 5, index: 1)
    }
}
