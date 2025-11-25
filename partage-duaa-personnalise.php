<?php
/**
 * Plugin Name: Partage Duaa Personnalisé
 * Description: Bloc Gutenberg pour partager le texte avec la classe "letexto" dans le même conteneur "bigma".
 * Version: 1.2
 * Author: Toi
 */

if (!defined('ABSPATH')) {
    exit;
}

// Charger JS + CSS dans l'éditeur Gutenberg
function enqueue_partage_duaa_block() {
    wp_enqueue_script(
        'partage-duaa-script',
        plugin_dir_url(__FILE__) . 'script.js',
        array('wp-blocks', 'wp-element'),
        filemtime(plugin_dir_path(__FILE__) . 'script.js')
    );

    wp_enqueue_style(
        'partage-duaa-style',
        plugin_dir_url(__FILE__) . 'style.css',
        array(),
        filemtime(plugin_dir_path(__FILE__) . 'style.css')
    );
}
add_action('enqueue_block_editor_assets', 'enqueue_partage_duaa_block');

// Charger JS + CSS sur le site public (frontend)
function enqueue_partage_duaa_frontend() {
    wp_enqueue_script(
        'partage-duaa-frontend',
        plugin_dir_url(__FILE__) . 'script.js',
        array(),
        filemtime(plugin_dir_path(__FILE__) . 'script.js'),
        true
    );

    wp_enqueue_style(
        'partage-duaa-frontend-style',
        plugin_dir_url(__FILE__) . 'style.css',
        array(),
        filemtime(plugin_dir_path(__FILE__) . 'style.css')
    );
}
add_action('wp_enqueue_scripts', 'enqueue_partage_duaa_frontend');