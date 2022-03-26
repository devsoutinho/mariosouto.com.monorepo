//
//  Note.swift
//  DevSoutinho WatchKit Extension
//
//  Created by Mario Souto on 25/03/22.
//

import Foundation

struct Note: Identifiable, Codable {
    let id: UUID
    let text: String
}
