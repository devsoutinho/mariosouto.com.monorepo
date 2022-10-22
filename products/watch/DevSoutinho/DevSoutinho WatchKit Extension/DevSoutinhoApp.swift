//
//  DevSoutinhoApp.swift
//  DevSoutinho WatchKit Extension
//
//  Created by Mario Souto on 25/03/22.
//

import SwiftUI

@main
struct DevSoutinhoApp: App {
    @SceneBuilder var body: some Scene {
        WindowGroup {
            NavigationView {
                ContentView()
            }
        }

        WKNotificationScene(controller: NotificationController.self, category: "myCategory")
    }
}
