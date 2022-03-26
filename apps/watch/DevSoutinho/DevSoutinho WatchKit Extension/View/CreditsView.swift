//
//  CreditsView.swift
//  DevSoutinho WatchKit Extension
//
//  Created by Mario Souto on 25/03/22.
//

import SwiftUI

struct CreditsView: View {
    // MARK: - PROPERTY
    // MARK: - FUNCTION
    // MARK: - BODY
    var body: some View {
        VStack(alignment: .center, spacing: 3) {
            Spacer()
            Text("Created by DevSoutinho")
            Spacer()
            Text("youtube.com/DevSoutinho")
            Spacer()
        }
    }
}

// MARK: - PREVIEW
struct CreditsView_Previews: PreviewProvider {
    static var previews: some View {
        CreditsView()
    }
}
